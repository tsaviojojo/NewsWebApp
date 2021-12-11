export class NewsModel {
    newsTitle : string = '';
    newsContent : string = '';
    newsAuthor : string = '';
    newsImage ?: File;
    newsPublished : Date | undefined;
    newsValidFrom : any ;
    newsValidTo : any;
    newsSavedAsDraft : boolean = false;
}