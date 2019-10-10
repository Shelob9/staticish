
export type filePath = string;
export type fileContents = string;
export interface FileSystemLike {
  getFile: (filePath: filePath ) => Promise<fileContents>;
  putFile: (filePath: filePath, contents: string ) => Promise<fileContents>;
  deleteFile: (filePath: filePath ) => Promise<boolean>;
  exists: (filePath: filePath, contents: string ) => Promise<boolean>;
  getDirectory: (directoryPath: filePath ) => Promise<boolean>;
  putDirectory: (directoryPath: filePath ) => Promise<boolean>;
  deleteDirectory: (directoryPath: filePath ) => Promise<boolean>;


};

