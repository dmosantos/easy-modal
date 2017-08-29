var easyModal = function (options) {
    var self = this;
    
    /* Options configuration */
    defaults = {
        title: null, // <string> | <dom object>
        body: null, // <string> | <dom object>
        size: null, // <string 'small' | 'big'>
        style: null, // <string (css)>
        buttons: null, // <string> | [ { <string>: { <event>: <function> } } | <string> ]
        closeButton: true, // <bool>
        afterOpen: null, // <function>
        afterClose: null // <function>
    };

    for (var prop in defaults) {
        if (!Object.prototype.hasOwnProperty.call(options, prop)) {
            options[prop] = defaults[prop];
        }
    }

    // Create the default object
    this.$ = document.createElement('div');
    this.$.className = 'cg-modal' + (options.size ? ' cg-modal-' + options.size : '');
    if(options.style)

    jQuery(
        '<div class=""' + (options.style ? ' style="' + options.style + '"' : '') + '>' +
            '<div class="cg-modal-main">' +
                (options.closeButton ? '<a class="cg-modal-close" href="javascript:void(0);" title="Fechar"><i class="fa fa-close"></i></a>' : '') +
                (options.title ? '<div class="cg-modal-head"><h2></h2></div>' : '') +
                (options.body ? '<div class="cg-modal-body"></div>' : '') +
                (options.buttons !== null && ((options.buttons.constructor === Array && options.buttons.length > 0) || typeof options.buttons == 'string') ? '<div class="cg-modal-foot"></div>' : '') +
            '</div>' +
            '<div class="cg-modal-overlay cg-modal-close"></div>' +
        '</div>'
    );

    // Append the title
    if (options.title)
        this.$.find('.cg-modal-head h2').append(options.title);

    // Append the body
    if (options.body)
        this.$.find('.cg-modal-body').append(options.body);

    // Append the buttons
    if (options.buttons !== null) {
        if (options.buttons.constructor === Array && options.buttons.length > 0) {
            jQuery.each(options.buttons, function(key, value) {
                if (typeof value == 'object') {
                    jQuery.each(value, function(key, value) {
                        var $button = jQuery(key);
                        jQuery.each(value, function(key, value) {
                            $button.on(key, value);
                        });
                        self.$.find('.cg-modal-foot').append($button);
                    });
                } else {
                    self.$.find('.cg-modal-foot').append(value);
                }
            });
        } else {
            self.$.find('.cg-modal-foot').append(options.buttons);
        }
    }

    // Open the modal
    this.open = function () {
        var windowWidth = jQuery(window).outerWidth();
        jQuery('body').addClass('cg-modal-open');
        jQuery('body').css('margin-right', (jQuery(window).outerWidth() - windowWidth) + 'px');

        if(typeof options.afterOpen == 'function')
            options.afterOpen();

        
        return self;
    }
    
    // Close the modal
    this.close = function () {
        self.$.addClass('cg-modal-closing');
        setTimeout(function () {
            jQuery('body').removeClass('cg-modal-open');
            jQuery('body').css('margin-right', 0);
            self.$.remove();

            if(typeof options.afterClose == 'function')
                options.afterClose();
        }, 350);
    }

    // Append modal to body
    this.$.appendTo('body');

    // Events
    this.$.find('.cg-modal-close').on('click', self.close);
}