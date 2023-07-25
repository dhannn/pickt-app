
export async function convertImageToBase64(image: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = () => resolve(reader.result?.toString() || '');
        reader.onerror = error => reject(error);
    })
}
