import { AbstractControl } from '@angular/forms';
import { Observable, Observer, of } from 'rxjs';

export const mimeType = (control: AbstractControl):
  Promise<{ [key: string]: any }> | Observable<{ [key: string]: any }> => {
  if (typeof (control.value) === 'string') {
    const frb = new Observable((observer: Observer<any>) => {
      observer.next(false);
    })
    return frb;
  }
  else {
    const file = control.value as File;
    const fileReader = new FileReader();
    const frObs = new Observable((observer: Observer<any>) => {
      fileReader.addEventListener("loadend", () => {
        // to read certain details of the file LIKE(change of extensions)
        const arr: any = new Uint8Array(fileReader.result as ArrayBuffer).subarray(0, 4);
        let header = "";
        let isValid = false;
        for (let i = 0; i < arr.length; i++) {
          header += arr[i].toString(16);
        }

        //Pattern of certain file type
        switch (header) {
          case "89504e47":
            isValid = true;
            break;
          case "ffd8ffe0":
          case "ffd8ffe1":
          case "ffd8ffe2":
          case "ffd8ffe3":
          case "ffd8ffe8":
            isValid = true;
            break;
          default:
            isValid = false; // Or you can use the blob.type as fallback
            break;
        }

        if (isValid) {
          observer.next(null);
        } else {
          observer.next({ invalidMimeType: true });
        }
        observer.complete();

      });
      fileReader.readAsArrayBuffer(file);
    });
    return frObs;
  }
}


// export const mimeType = (control: AbstractControl): any => {
//   console.log("type", control);
//   if (typeof (control.value) === 'string') {
//     return null;
//   }
//   else {
//     const file = control.value as File;
//     const fileReader = new FileReader();
//     const frObs = new Observable((observer: Observer<any>) => {
//       fileReader.addEventListener("loadend", () => {
//         // to read certain details of the file LIKE(change of extensions)
//         const arr: any = new Uint8Array(fileReader.result as ArrayBuffer).subarray(0, 4);
//         let header = "";
//         let isValid = false;
//         for (let i = 0; i < arr.length; i++) {
//           header += arr[i].toString(16);
//         }

//         //Pattern of certain file type
//         switch (header) {
//           case "89504e47":
//             isValid = true;
//             break;
//           case "ffd8ffe0":
//           case "ffd8ffe1":
//           case "ffd8ffe2":
//           case "ffd8ffe3":
//           case "ffd8ffe8":
//             isValid = true;
//             break;
//           default:
//             isValid = false; // Or you can use the blob.type as fallback
//             break;
//         }

//         if (isValid) {
//           observer.next(null);
//         } else {
//           observer.next({ invalidMimeType: true });
//         }
//         observer.complete();

//       });
//       fileReader.readAsArrayBuffer(file);
//     });
//     return frObs;
//   }
// }

