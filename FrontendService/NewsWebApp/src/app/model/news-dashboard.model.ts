export class NewsModel {
    newsId : any;
    newsTitle : string = '';
    newsContent : string = '';
    newsAuthor : string = '';
    newsImage ?: File;
    newsPublished : any;
    newsValidFrom : any ;
    newsValidTo : any;
    newsSavedAsDraft : boolean = false;
    newsReadStatus : any;
}