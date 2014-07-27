$(document).ready(function() {

  $.each($('.select2'), function(){
    var $this = $(this)
      , type = $this.data('type')
      , parent = $this.data('parent')
      , $parent = $(parent)

    $this.select2({
      width: 220
    , query: function(query) {
        console.log($parent.val(), $parent)
        var _data = {results: []}
        // var url = '/addresses/' + type + '/?'
        $.get('/addresses/' + type + '/?parent_id=' + ($parent.val() || 0) + '&q=' + query.term, function(data){
          for(var d in data) {
            _data.results.push({id: data[d].id, text: data[d].title})
          }
          console.log(_data)

          query.callback(_data)
        })
      }
    })
  })

});
