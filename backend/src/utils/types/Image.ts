class Image {
	public dataUrl: string;
	public isValid: boolean;

	constructor(dataUrl: string) {
		this.dataUrl = dataUrl;
		this.isValid = this.isValidImage(dataUrl);
	}

	isValidImage(dataUrl: string) {
		const dataUrlPattern = /^data:image\/(png|jpeg|jpg|gif);base64,/;
		if (!dataUrlPattern.test(dataUrl)) {
			return false;
		}

		return true;
	}
}

export default Image;
