export function generateLinks(dirContents : string[],path:string){
    path = path.substring(1)
    let htmlString = `<ul>`;
    for(let i = 0 ; i<dirContents.length ; i++){
        let link = `<li> <a href = '/${path+ "/" + dirContents[i]}'> ${dirContents[i]} </a> </li>`
        htmlString += link
    }
    htmlString += "</ul>";
    return htmlString;
}