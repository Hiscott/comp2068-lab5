/**
 * Created by Jordan on 2016-10-14.
 */
/* use jquery which we just downloaded
find any html element with the class *confirmation*
attach a js confirmation popup to the click event
of these html elements
 */
$('.confirmation').on('click', function(){
    return confirm('Are you sure you want to delete this?');
});