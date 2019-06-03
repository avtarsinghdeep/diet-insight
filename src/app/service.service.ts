import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(public httpClient: HttpClient) { }

  uploadBase64(base64: string, filename: string): Observable<any> {
    const blob = this.convertBase64ToBlob(base64);
    const fd = new FormData();

    fd.append('userPhoto', blob, filename);
    fd.append('numDeclaration', '01012018');
    console.log("fd",fd);

    return this.httpClient.post('http://192.168.31.137:3001/api/photo', fd)
       .pipe(catchError((error: any) => Observable.throw(error.json())));
  }
  uploadFile(formData): Observable<any> {
    return this.httpClient.post('http://192.168.31.137:3001/api/photo', formData)
       .pipe(catchError((error: any) => Observable.throw(error.json())));
  }


  private convertBase64ToBlob(base64: string) {
    const info = this.getInfoFromBase64(base64);
    const sliceSize = 512;
    const byteCharacters = window.atob(info.rawBase64);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);

      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      byteArrays.push(new Uint8Array(byteNumbers));
    }

    return new Blob(byteArrays, { type: info.mime });
  }

private getInfoFromBase64(base64: string) {
    const meta = base64.split(',')[0];
    const rawBase64 = base64.split(',')[1].replace(/\s/g, '');
    const mime = /:([^;]+);/.exec(meta)[1];
    const extension = /\/([^;]+);/.exec(meta)[1];

    return {
      mime,
      extension,
      meta,
      rawBase64
    };
  }
}
