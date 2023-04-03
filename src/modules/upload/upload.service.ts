import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { writeFile } from "fs";
import path from "path";

@Injectable()
export class UploadService {
	createName(name: string): string {
		return Date.now() + "-" + name;
	}

	upload(buffer: Buffer, name: string) {
		writeFile(`images/${name}`, buffer, (err) => {
			if (err) throw new InternalServerErrorException();
		});
	}
}
