async function publishBtn(tp,app){
    let file = tp.file.find_tfile(tp.file.title);
    let path  = "_posts";
    const folder = app.vault.getAbstractFileByPath(path).name; 
    let year  = tp.date.now("YYYY");
    let month = tp.date.now("MM");
    const {update} = app.plugins.plugins["metaedit"].api;
    await update("date",tp.date.now("yyyy-MM-DD hh:mm:ss"),file)
    if(tp.frontmatter.date !== undefined){
        await tp.file.move(`/${folder}/${year}/${month}/${tp.file.title}`)
    }
}
module.exports = publishBtn