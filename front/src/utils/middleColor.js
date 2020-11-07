function getColor(arr) {
    const count = arr.length / 4;

    const colors = {
        r: 0,
        g: 0,
        b: 0,
        a: 0,
    };

    for (let i = 0; i < count; i++) {
        const blockStart = i * 4;
        colors.r += arr[blockStart];
        colors.g += arr[blockStart + 1];
        colors.b += arr[blockStart + 2];
        colors.a += arr[blockStart + 3];
    }

    colors.r = ~~(colors.r / count);
    colors.g = ~~(colors.g / count);
    colors.b = ~~(colors.b / count);
    colors.a = ~~(colors.a / count);

    return colors
}

export default function (imagePath) {
    return new Promise((resolve) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const image = new Image();
        image.src = imagePath;
        image.crossOrigin = "Anonymous";
        image.addEventListener('load', () => {
            const { naturalWidth, naturalHeight } = image;
            canvas.width = naturalWidth;
            canvas.height = naturalHeight;
            ctx.drawImage(image, 0, 0, naturalWidth, naturalHeight);
            const imageData = ctx.getImageData(0, 0, naturalWidth, naturalHeight);
            resolve(getColor(imageData.data));
        });
    });
}