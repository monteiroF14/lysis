class Image {
	public dataUrl: string;
	public isValid: boolean;

	constructor(dataUrl: string) {
		this.dataUrl = dataUrl;
		this.isValid = this.isValidImage(dataUrl);
	}

	isValidImage(dataUrl: string) {
		const urlPattern = /^https:\/\/example\.com\/images\/[\w.-]+\.png$/;
		return urlPattern.test(dataUrl);
	}

	getImageNameFromUrl(): string {
		const parts = this.dataUrl.split("/");
		const imageName = parts[parts.length - 1];
		return imageName!;
	}
}

export default Image;
