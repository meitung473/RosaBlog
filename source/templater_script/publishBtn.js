async function publishBtn(tp,app){
    let file = tp.file.find_tfile(tp.file.title);
    let path  = "source/_posts";
    let categories = tp.frontmatter.categories
    let middlepath = (()=>{
        if(!Array.isArray(categories)){
           return [categories]
        }
        return [...categories]
    })()
    console.log(middlepath)
    const folder = app.vault.getAbstractFileByPath(path).name; 
    // let year  = tp.date.now("YYYY");
    // let month = tp.date.now("MM");
    const {update} = app.plugins.plugins["metaedit"].api;
    await update("date",tp.date.now("yyyy-MM-DD hh:mm:ss"),file)
    let nonesistsfolder = app.vault.getAbstractFileByPath(`/${folder}/${middlepath.join('/')}`);
    
    let newpath =`/source/${folder}/`
   
   
    if(!nonesistsfolder){
        for(let i =0;i<categories.length;i++){
            newpath += categories[i] +"/"
            await app.vault.createFolder(newpath);
        }
        //await app.vault.createFolder(`/source/${folder}/${middlepath}/`);
    }
    console.log(newpath)
    await tp.file.move(`${newpath}${tp.file.title}`)
}
module.exports = publishBtn