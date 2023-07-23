import mongoose, { Schema } from "mongoose";
import { Post, PostContent, PostTag } from "../schema/Post";
import { User } from "../schema/User";
import { Comment } from "../schema/Comment";

const postSchema = new Schema<Post>({
    _id: { type: String },
    content: { type: Object, required: true },
    metadata: {
        tag: { type: String, required: true },
        author: { type: Object, required: true },
        createdAt: { type: Date, required: true }
    },
    voteInfo: {
        upvotes: { type: Number, required: true },
        downvotes: { type: Number, required: true }
    },
    comments: [{ type: Object, default: [], required: true }],
    isDeleted: { type: Boolean }
});

const PostModel = mongoose.model<Post>('Post', postSchema);

const POST_PER_PAGE = 2;

export type PostQuery = {
    page?: number, 
    attr: any
}

export async function cleanData() {
    let posts: (mongoose.Document<unknown, {}, Post> & Omit<Post & Required<{
        _id: String;
    }>, never>)[] = [];

    try {
        posts = await PostModel.find({});
    } catch(error) {
        console.error(error);
    }

    let newPosts: Post[] = [];

    posts.forEach(
        async (post) => {
            let np = post.toObject();
            np._id = generateSlug(np.content.title);
            let cloned = new PostModel(np);
            newPosts.push(cloned);

            await PostModel.deleteOne({ _id: post._id });
        } 
    )

    await PostModel.insertMany(newPosts);
}

export async function findPosts({ page, attr }: PostQuery = { page: 1, attr: {}}) {
    try {
        const attrObj = restructureAttr(attr);

        const posts = await PostModel.find(attrObj)
            .sort('metadata.createdAt')
            .skip(page! * POST_PER_PAGE - POST_PER_PAGE)
            .limit(POST_PER_PAGE);
        

        console.log('Successfully finds posts from database');
        
        return posts;
    } catch (error) {
        console.error(error);
        return error;
    }

    function restructureAttr(attr: any) {
        let obj: Record<string, any> = {};

        if (attr.tag) {
            obj['metadata.tag'] = attr.tag;
        }

        if (attr.username) {
            obj['metadata.author.username'] = attr.username;
        }

        return obj;
    }
}

export async function findPostById(id: string) {
    const post = await PostModel.findById(id);    
    return post;
}

export async function findComments(postId: string) {
    const post = await PostModel.findById(postId);
    return post?.comments;
}

export async function findCommentById(postId: string, commentId: string) {
    const post = await PostModel.findById(postId);
    const comments = post?.comments!;

    return getComment(comments, commentId);
}

function getComment(comments: Comment[], commentId: string) {
    let stack: Comment[] = [];
    
    comments.forEach((comment) => stack.push(comment));

    while (stack.length > 0) {
        const comment = stack.pop();
        
        if (comment?._id === commentId) 
            return comment;

        if (comment?.replies !== undefined) {
            comment.replies.forEach((reply) => stack.push(reply));
        }
    }

    return null;
}

export interface ContentInsert {
    content: PostContent | string,
    author: {    
        fullName: {
            firstName: string
            lastName?: string
        },
        username: string
    },
};

export interface PostInsert extends ContentInsert {
    tag: string
}

export interface CommentInsert extends ContentInsert {
    postId: string,
    commentId?: string
}

export async function insertPost(data: PostInsert) {
    const { content, author, tag } = data;
    const id = generateSlug((content as PostContent).title);

    const metadata = {
        tag: tag,
        author: author,
        createdAt: Date.now()
    }

    const voteInfo = {
        upvotes: 0,
        downvotes: 0
    }
    const postObject = {
        _id: await doesIdExist((content as PostContent).title)? id: id.concat('-'),
        content: content,
        metadata: metadata,
        voteInfo: voteInfo,
        comments: []
    };

    const post = new PostModel(postObject);

    try {
        await post.save(); 
    } catch (error) {
        console.error(error);
    }

    return post;

    async function doesIdExist(id: string) {
        return (await PostModel.find({ _id: id }) !== null);
    }
}

export async function insertComment(data: CommentInsert) {
    const { content, author, postId, commentId } = data;
    
    let post = await PostModel.findById(postId);
    let comments = post?.comments;

    if (post === null) {
        return null;
    }

    let comment = {
        _id: `${postId}-${commentId || 0}-${post.comments?.length || 0}`,
        content: content as string,
        metadata: {
            author: author,
            createdAt: new Date()
        },
        voteInfo: {
            upvotes: 0,
            downvotes: 0
        }, 
        replies: [],
        isDeleted: false
    };

    if (comments === undefined) {
        comments = [];
    }
    
    if (commentId === undefined) {
        comments.push(comment);

        await post.save();
        return post;
    }

    let parentComment = getComment(comments!, commentId);
    if (parentComment === null)
        return null;
    
    if (parentComment.replies === undefined) {
        parentComment.replies = [];
    }

    parentComment.replies.push(comment);
    // post.comments = comments;
    post.markModified('comments');
    await post.save();
    
    return post;
}

/**
 * I've been doing landscape photography for years, and here are some of my top tips:
1. Wake up early to catch the golden hour light.
2. Use a tripod for stability.
3. Experiment with different angles and perspectives.
4. Incorporate leading lines to create depth.
5. Don't forget to post-process your photos to enhance colors and contrast.
I hope you find these tips helpful!
 */

export interface PostUpdate {
    id: string,
    isDeleted?: boolean,
    tag?: PostTag,
    content?: string,
    vote?: number
}

export async function updatePost(data: PostUpdate) {
    const { id, isDeleted, tag, content, vote } = data;
    let post = await findPostById(id);

    if (post === null) {
        return;
    }
    
    if (isDeleted !== undefined)
        post.isDeleted = isDeleted;
        
    if (tag !== undefined) {
        post.metadata.tag = tag;
        post.markModified('metadata');
    }
    
    if (content !== undefined) {
        post.content.content = content;
        post.markModified('content');
    }

    if (vote !== undefined) {
        if (vote === 1) {
            post.voteInfo.upvotes++;
        } else if (vote === -1) {
            post.voteInfo.downvotes++;
        }
    }

    await post?.save();
    return post;
}


export interface CommentUpdate {
    postId: string,
    commentId: string,
    isDeleted?: boolean
    content?: string,
    vote?: number
}

export async function updateComment(data: CommentUpdate) {
    const { postId, commentId, isDeleted, content, vote } = data;
    let post = await findPostById(postId);
    let comments = post!.comments;
    let comment = getComment(comments!, commentId);

    if (comment === null) {
        return;
    }

    if (post === null) {
        return null;
    }
    
    if (isDeleted !== undefined)
        comment.isDeleted = isDeleted;
    
    if (content !== undefined) {
        comment.content = content;
    }

    if (vote !== undefined) {
        if (vote === 1) {
            comment.voteInfo.upvotes++;
        } else if (vote === -1) {
            comment.voteInfo.downvotes++;
        }
    }

    post.markModified('comments');
    await post.save();
    return post.comments;
}

function generateSlug(title: string) {
    let slug = title
        .toLowerCase()
        .replace(/[!@#$%^&*(),.:;?[\]{}_+=\\|<>~`]/g, '')
        .trim()
        .replace(/\s/g, '-');
    
    return slug;
}
