import {FileSystemLike,filePath,fileContents} from './types';
export async function FS_DIR(baseBath:string) : Promise<FileSystemLike>
{

  return {
    getFile: (filePath: filePath ) => new Promise( async (resolve,reject) => {

    }),
    putFile: (filePath: filePath, contents: string )  => new Promise( async (resolve,reject) => {

    }),
    deleteFile: (filePath: filePath )  => new Promise( async (resolve,reject) => {

    }),
    exists: (filePath: filePath, contents: fileContents )  => new Promise( async (resolve,reject) => {

    }),
    getDirectory: (directoryPath: filePath )  => new Promise( async (resolve,reject) => {

    }),
    putDirectory: (directoryPath: filePath )  => new Promise( async (resolve,reject) => {

    }),
    deleteDirectory: (directoryPath: filePath )  => new Promise( async (resolve,reject) => {

    }),

  }
}