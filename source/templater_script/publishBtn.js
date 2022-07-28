const fs = require('node:fs');

async function publishBtn(tp,app){
    let file = tp.file.find_tfile(tp.file.title);
    let path  = "source/_posts";
    const folder = app.vault.getAbstractFileByPath(path).name; 
    let categories = tp.frontmatter.categories;
    let middlepath = (()=>{
        if(!Array.isArray(categories)){
           return [categories]
        }
        return [...categories]
    })()

    let nonesistsfolder = tp.file.exists(`/source/${folder}/${middlepath.join('/')}/${tp.file.title}.md`);
    let newpath =app.vault.adapter.basePath+`\\source\\${folder}\\`
    let relativePath = `/source/${folder}/`
    if(nonesistsfolder){
        new tp.obsidian.Notice("already published "+tp.file.title,2000)
        return 
    }else{
        for(let i =0;i<categories.length;i++){
            newpath += categories[i] +"\\"
            relativePath+=categories[i]+"/"
            if(fs.existsSync(newpath)){
                continue
            }
            await app.vault.createFolder(relativePath)
        }
    }
    if(tp.frontmatter.date == null){
        const {update} = app.plugins.plugins["metaedit"].api;
        await update("date",tp.date.now("yyyy-MM-DD hh:mm:ss"),file)
    }
    if(tp.frontmatter.date == undefined){
        const {createYamlProperty} = app.plugins.plugins["metaedit"].api;
        await createYamlProperty("date",tp.date.now("yyyy-MM-DD hh:mm:ss"),file)
    }
    await tp.file.move(`${relativePath}${tp.file.title}`)
    new tp.obsidian.Notice(tp.file.title+" draft published ! ",2000)
}
module.exports = publishBtn