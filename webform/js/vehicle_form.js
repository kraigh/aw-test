function call_year(id) {
  $("#modal-content #"+id+" #make_loading").show();
  var year = $("#modal-content #"+id+" #year").val();

  $('#modal-content #'+id+' #make').attr('disabled', 'disabled');
  $('#modal-content #'+id+' #model').attr('disabled', 'disabled');
  $('#modal-content #'+id+' #trim').attr('disabled', 'disabled');
  $('#modal-content #'+id+' #detail').html('');

  var params = "year=" + year;
  $.get('http://kraigh.com/webform/make.php', params, function(data) {
      if (data.length>0) {
        $("#modal-content #"+id+" #make").html(data).removeAttr('disabled');
        $("#modal-content #"+id+" #make_loading").hide();
        // if(make != 0) {
        //   $("#"+id+" #make option[value="+make+"]").attr('selected', 'selected');
        //   if(make != 'Please Select Make' && make != '') {
        //     call_make(id, make);
        //   }
        // }
      }
    });
}

function call_make(id, make) {
  $("#modal-content #"+id+" #model_loading").show();
  var year = $("#modal-content #"+id+" #year").val();
  if(make == undefined){
    var make = $("#modal-content #"+id+" #make").val();
  }
  if(model == undefined){
    var model = $("#modal-content #"+id+" #model").val();
  }

  $('#modal-content #'+id+' #model').attr('disabled', 'disabled');
  $('#modal-content #'+id+' #trim').attr('disabled', 'disabled');
  $('#modal-content #'+id+' #detail').html('');

  var params = "year=" + year + "&make=" + make;
  $.get('http://kraigh.com/webform/model.php', params, function(data)
  {
      if (data.length>0)
      {
        $("#modal-content #"+id+" #model").html(data).removeAttr('disabled');
        $("#modal-content #"+id+" #model_loading").hide();
        if(model != 0)
        {
          $("#modal-content #"+id+" #model option[value="+model+"]").attr('selected', 'selected');
          if(model != 'Please Select Model' && model != '')
            {
              call_model(id, make, model);
            }
        }
      }
  });
}

function call_model(id, make, model){
  $("#modal-content #"+id+" #trim_loading").show();
  var year = $("#modal-content #"+id+" #year").val();
  if(make == undefined){
    var make = $("#modal-content #"+id+" #make").val();
  }
  if(model == undefined){
    var model = $("#modal-content #"+id+" #model").val();
  }
  if(trim == undefined){
    var trim = $("#modal-content #"+id+" #trim").val();
  }

  $('#modal-content #'+id+' #trim').attr('disabled', 'disabled');
  $('#modal-content #'+id+' #detail').html('');

  var params = "year=" + year + "&make=" + make + "&model=" + model;
  $.get('http://kraigh.com/webform/trim.php', params, function(data)
  {
      if (data.length>0)
      {
        $("#modal-content #"+id+" #trim").html(data).removeAttr('disabled');
        $("#modal-content #"+id+" #trim_loading").hide();
        if(trim != 0)
        {
          $("#modal-content #"+id+" #trim option[value="+trim+"]").attr('selected', 'selected');
          if(trim != 'Please Select Trim' && trim != '')
            {
              call_trim(id, make, model, trim);
            }
        }
      }
  });
}

function call_trim(id, make, model, trim){

  $("#modal-content #"+id+" #detail_loading").show();
  var year = $("#modal-content #"+id+" #year").val();
  if(make == undefined){
    var make = $("#modal-content #"+id+" #make").val();
  }
  if(model == undefined){
    var model = $("#modal-content #"+id+" #model").val();
  }
  if(trim == undefined){
    var trim = $("#modal-content #"+id+" #trim").val();
  }

  $('#modal-content #'+id+' #detail').html('');

  $("#modal-content #"+id+" #detail_loading").hide();

  var detail_content = '';
  detail_content = detail_content + '&nbsp;' + make;
  detail_content = detail_content + '&nbsp;' + model;
  detail_content = detail_content + '&nbsp;' + trim;
  $("#modal-content #"+id+" #detail").html(detail_content);
}

