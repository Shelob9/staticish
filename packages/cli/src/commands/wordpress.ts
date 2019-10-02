import {Command, flags} from '@oclif/command'
import {wpToStatic} from '@staticish/wp-api-to-static';

const superagent = require('superagent');

async function processBatch(page: Number,apiUrl: String,filePathArgs: {
  wpJsonPath: String, 
  markdownPath: String,
}){
  const data = await wpToStatic(
    {
      endpoint: apiUrl,
      perPage : 10,
      page
    },
    filePathArgs
  );
}
export default class Wordpress extends Command {
  static description = 'Convert a WordPress site to static files'

  
  static flags = {
    help: flags.help({char: 'h'}),
    apiUrl: flags.string({char: 'n', description: 'WP API URL'}),
    dir: flags.string({char: 'n', description: 'Directories to write files to'}),
    force: flags.boolean({char: 'f',description: 'Use the force'} ),
  }

  static args = [
    {name: 'file'}
  ]

  async run() {
    const {args, flags} = this.parse(Wordpress);

    const {apiUrl,dir} = flags;
    const filePathArgs = {
      wpJsonPath: dir + '/json/', 
      markdownPath: dir + '/markdown',
    };

    const getTotal = async (postType:string,): Promise<Number> => {
      return new Promise( (resolve,reject) => {
        return superagent
        .get(`${apiUrl}/wp/v2/${postType}` )
        .set('accept', 'json')
        .end((err, res: {
          headers: {
            'x-wp-total': Number
            'x-wp-totalpages': Number
          }
        }) => {
          if( err) throw err;
          resolve(res.headers['x-wp-totalpages']);
        });
      })
        
    }

    const getTotals = async () : Promise<{post:Number,page:Number,greatest: Number}> => {
      return new Promise( (resolve,reject) => {
          Promise.all( [
            getTotal('posts'),
            getTotal('pages')
          ]).then( (r: Array<Number>) => {
              resolve({
                post: r[0],
                page: r[1],
                greatest: r[0] < r[1] ? r[0] : r[1]
              })
          }).catch( e => resolve(e));
      });
    }

    const totalPosts = await getTotals();
    const {greatest} = totalPosts;
    this.log(`hi ${totalPosts.greatest}`)
 

    for( let i: number = 0; i <= greatest; i++ ){
      this.log(`${i}`);
    }

   
    
  }
}
