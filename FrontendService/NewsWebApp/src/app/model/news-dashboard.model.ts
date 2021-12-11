export class NewsModel {
    newsTitle : string = '';
    newsContent : string = '';
    newsAuthor : string = '';
    newsImage ?: File;
    newsPublished : Date | undefined;
    newsValidFrom : Date | undefined;
    newsValidTo : Date | undefined;
    newsSavedAsDraft : boolean = false;
}