$(document).ready(function() {

  $.each($('.select2'), function(){
    var $this = $(this)
      , type = $this.data('type')
      , parent = $this.data('parent')
      , $parent = $(parent)
      , lastVal = null
      , $child = $('[data-parent="#' + $this.attr('id') + '"]')

    $this.select2({
      width: 220
    , query: function(query) {

        var _data = {results: []}
        // var url = '/addresses/' + type + '/?'
        $.get('/addresses/' + type + '/?parent_id=' + ($parent.val() || 0) + '&q=' + query.term, function(data){
          for(var d in data) {
            _data.results.push({id: data[d].id, text: data[d].title})
          }

          query.callback(_data)
        })
      }
    }).on('change', function(ev){
      if (lastVal !== null && lastVal != ev.val) {
        if ($child.length) {
          $child.select2('val', '')
        }
      }
      lastVal = ev.val
    })
  })

});
