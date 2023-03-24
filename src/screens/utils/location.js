const GOOGLE_API_KEY='AIzaSyArzQUmPBY2dYMsV8C9bKVjg2WpQIvC-ec';
const signature='sHvQZvdE48z37AHvoHK-LweWWvg=';
lat='47.159074310864234'; 
lng='27.596973045409605';




export function getMapPreview() {
    const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=16&size=400x400&maptype=roadmap&markers=color:red%7Clabel:S%7C40.702147,-74.015794&markers=color:green%7Clabel:G%7C40.711614,-74.012318&markers=color:red%7Clabel:C%7C${lat},${lng}&key=${GOOGLE_API_KEY}&signature=${signature}`;

    //console.log(imagePreviewUrl);
    return  imagePreviewUrl;
}