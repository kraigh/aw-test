/**
 * Note: href='javascript:;' is recommended for links that don't need an actual href.
 *
 * To display inline content that already exists in the DOM:
 *   <a href='javascript:;' class='modal-link-content' data-modal-content-id='content_div_id'>Link Text</a>
 *   - data-modal-content-id should return the ID of the element that contains the hidden markup.
 *   - This content should already be hidden, this script won't make any assumptions or hide it for you.
 *   - data-modal-width|height can also be included, but are not required, to set the width|height of the modal.
 *
 * To display an iframe:
 *  <a href='javascript:;' class='modal-link-iframe' data-modal-iframe-src='//example.com' data-modal-width='600' data-modal-height='400'>Link Text</a>
 *  - data-modal-iframe-src is the URL that will be passed to the src='' tag of the iframe.
 *  - data-modal-width|height can also be included, but are not required, to set the width|height of the modal.
 *
 * To display ajaxed-in content:
 *  <a href='javascript:;' class='modal-link-ajax' data-modal-ajax-src='//example.com/ajax.html' data-modal-width='600' data-modal-height='400'>Link Text</a>
 *  - data-modal-ajax-src is the URL to the content that will be inserted into the modal.
 *  - this is the only option which includes a loading animation until the content is ready for insertion.
 *  - data-modal-width|height can also be included, but are not required, to set the width|height of the modal.
 */

(function ($) {

  $(document).ready(function() {
    $('.modal-link-content').live('click', function() {
      showModal($('#' + $(this).attr('data-modal-content-id')).html(), $(this).attr('data-modal-effect'), $(this).attr('data-modal-width'), $(this).attr('data-modal-height'));
      // Remove the hidden divs from the DOM so that jQuery selectors and such will work correctly.
      $('#' + $(this).attr('data-modal-content-id')).remove();
    });
    $('.modal-link-iframe').live('click', function() {
      showModal('<div id="modal-loading"></div><iframe src="' + $(this).attr('data-modal-iframe-src') + '" border="0" allowtransparency="true" width="100%" height="100%"></iframe>', $(this).attr('data-modal-effect'), $(this).attr('data-modal-width'), $(this).attr('data-modal-height'));
      $('#modal iframe').hide().load(function() {
        $('#modal-loading').fadeOut(200, function() {
          $('#modal-loading').remove();
          $('#modal iframe').fadeIn();
        });
      });
    });
    $('.modal-link-ajax').live('click', function() {
      showModal('<div id="modal-loading"></div><div id="modal-ajax"></div>', $(this).attr('data-modal-effect'), $(this).attr('data-modal-width'), $(this).attr('data-modal-height'));
      $('#modal-ajax').hide().load($(this).attr('data-modal-ajax-src'), function() {
        $('#modal-loading').fadeOut(200, function() {
          $('#modal-loading').remove();
          $('#modal-ajax').fadeIn();
        });
      });
    });
  });

})(jQuery);

function showModal(markup, effect, w, h) {
  $ = jQuery;

  // Set defaults.
  w = typeof w !== 'undefined' ? w : 400;
  h = typeof h !== 'undefined' ? h : 400;

  // Account for padding and set content height/width.
  innerW = w-60;
  innerH = h-60;

  // If we don't already have a modal, create a new one.
  if (!$('#modal').length) {

    $('body').append('<div id="modal-underlay" onclick="closeModal();"></div><div id="modal" style="width:'+w+'px;height:'+h+'px;"><a href="javascript:closeModal();" id="modal-close"></a><div id="modal-content"">' + markup + '</div></div>');

    // Show our modal wrapper and modal.
    $('#modal-underlay').height( $('html').outerHeight() ).fadeTo(100, 0.5);

    // Show modal based upon 'effect'.
    switch (effect) {
      case 'slideUp':
        $('#modal').css('bottom', 0 - $('#modal').outerHeight() + 'px'); // Move modal 'underneath' the viewable window.
        $('#modal').css('margin-left', 0 - ( $('#modal').outerWidth() / 2 ) + 'px'); // Center modal horizontally.
        $('#modal').animate({bottom: 0}, 500, 'easeOutExpo'); // Slide modal 'up'.
        $('#modal').css({borderBottomLeftRadius: 0, borderBottomRightRadius: 0}); // Remove bottom border radii so it appears attached to bottom of screen.
        break;
      default:
        $('#modal').hide();
        $('#modal').css('margin-top', 0 - ( $('#modal').outerHeight() / 2 ) + 'px'); // Center modal vertically.
        $('#modal').css('margin-left', 0 - ( $('#modal').outerWidth() / 2 ) + 'px'); // Center modal horizontally.
        $('#modal').fadeIn();
        break;
    }

  } else { // If we already have a modal, just fade in the new contents and resize the modal wrapper.

    $('#modal-content').fadeTo(100, 0.0, function() {
      $('#modal').html('<div id="modal-loading"></div>');
      $('#modal').animate({width: w+'px', height: h+'px'}, 200, function() {
        $('#modal').html('<a href="javascript:closeModal();" id="modal-close"></a><div id="modal-content">' + markup + '</div>').fadeIn();
        $('#modal-loading').fadeOut();
      });
    })

  }

  // Listen for 'esc' press.
  $(document).bind('keyup', function(e) {
    if (e.keyCode == 27) { closeModal(); }
  });

  // If this modal needs to listen for a 'success', listen for it.
}

function closeModal() {
  $ = jQuery;

  $('#modal-underlay').fadeOut(100, function() {
    $('#modal-underlay').remove();
  });
  $('#modal').fadeOut(100, function() {
    $('#modal').remove();
  });
  $(document).unbind('keyup');
}
