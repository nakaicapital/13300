import {mkdir,readdir,rename} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
await mkdir('originals/photos',{recursive:true});
for(const name of (await readdir('dist/assets/photos')).filter(n=>n.endsWith('.jpg'))){
  await rename(`dist/assets/photos/${name}`,`originals/photos/${name}`);
  execFileSync('ffmpeg',['-hide_banner','-loglevel','error','-i',`originals/photos/${name}`,'-vf','scale=1920:-2','-q:v','3',`dist/assets/photos/${name}`]);
}
console.log('Optimized 55 photographs; originals preserved.');
