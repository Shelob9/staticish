import FS_DIR from './fsDirectory';

describe( 'fsDirectory', () => {
    const basepath = __dirname + '/data/';
    it( 'Can create, read, update and delete a file', async() => {
        const writer = await new FS_DIR(basepath);
        const contents = 'Hi Roy';
        const filePath = basepath + JSON.stringify(new Date() ) +  '-hi-roy.txt';
        const results = await writer.putFile(filePath, contents );
        const exists = await writer.exists(filePath);
        const fileContents = await writer.getFile(filePath);
        expect(exists ).toBe(true);
        expect( fileContents ).toEqual(contents);
        expect( results ).toEqual(contents);
        const newContents = 'Hi Roy. Also, Hi Roy';
        const editResults = await writer.putFile(filePath,newContents);
        const fileContentsAfterUpdate = await writer.getFile(filePath);
        expect( editResults ).toEqual(newContents);
        expect( fileContentsAfterUpdate ).toEqual(newContents);


    });

    it( 'Can create a directory of files, also read, update and delete it', () => {

    });
    
});