// Taglist data array for filling in info box
var tagListData = [];

// DOM Ready =============================================================
$(document).ready(function() {

  // Populate the tag table on initial page load
  populateTable();
  // Tag link click
$('#tagList table tbody').on('click', 'td a.linkshowtag', showTagInfo);
});
  // Delete tag link click
  $('#tagList table tbody').on('click', 'td a.linkdeletetag', deleteTag);

// Functions =============================================================

// Fill table with data
function populateTable() {

  // Empty content string
  var tableContent = '';


  // jQuery AJAX call for JSON
  $.getJSON( '/tags/taglist', function( data ) {
    // Stick our user data array into a taglist variable in the global object
tagListData = data;
    // For each item in our JSON, add a table row and cells to the content string
    $.each(data, function(){
      tableContent += '<tr>';
      tableContent += '<td><a href="#" class="linkshowtag" rel="' + this._id + '">' + this._id + '</a></td>';
      tableContent += '<td>' + this.EPC + '</td>';
      tableContent += '<td><a href="#" class="linkdeletetag" rel="' + this._id + '">DELETE</a></td>';
      tableContent += '</tr>';
    });

    // Inject the whole content string into our existing HTML table
    $('#tagList table tbody').html(tableContent);
  });
};

// Show Tag Info
function showTagInfo(event) {

  // Prevent Link from Firing
  event.preventDefault();

  // Retrieve username from link rel attribute
  var thisTagName = $(this).attr('rel');

  // Get Index of object based on id value
  var arrayPosition = tagListData.map(function(arrayItem) { return arrayItem._id; }).indexOf(thisTagName);
  // Get our Tag Object
  var thisTagObject = tagListData[arrayPosition];
  //Handle Date Data
  var date = new Date(thisTagObject.Date);
  var a = date.toDateString() +'  '+date.toTimeString();

  //Populate Info Box
  $('#tagInfoId').text(thisTagObject._id);
  $('#tagInfoAntennaId').text(thisTagObject.Ant_Id);
  $('#tagInfoPc').text(thisTagObject.PC);
  $('#tagInfoEpc').text(thisTagObject.EPC);
  $('#tagInfoDate').text(a);
  // $('#tagInfoDate').text(thisTagObject.Date);
};

// Delete Tag
function deleteTag(event) {

  event.preventDefault();

  // Pop up a confirmation dialog
  var confirmation = confirm('Are you sure you want to delete this tag?');

  // Check and make sure the user confirmed
  if (confirmation === true) {

    // If they did, do our delete
    $.ajax({
      type: 'DELETE',
      url: '/tags/deletetag/' + $(this).attr('rel')
    }).done(function( response ) {

      // Check for a successful (blank) response
      if (response.msg === '') {
      }
      else {
        alert('Error: ' + response.msg);
      }

      // Update the table
      populateTable();

    });

  }
  else {

    // If they said no to the confirm, do nothing
    return false;

  }

};