// vim: sw=4:
jQuery(function($){
    $('body').on({
        mouseenter: function(e) {
            var $this = $(this);
            var o = this;
            if ( o.href != '#' ) {
                var uri = $.url.parse(o.href),
                t = uri.query.replace(/-/g,'%'),
                t = t.replace(/_/g,'%2F'),
                t2 = $.url.decode(t.slice(2)),
                uri2 = $.url.parse(t2),
                htmltext = (uri.host == 'urldefense.proofpoint.com') ? uri2.source.replace(/&d=.*$/, '') : uri.source;
                chrome.extension.sendRequest('show', function(r) {
                    if (uri.host == 'urldefense.proofpoint.com') {
                        text = uri2.source.replace(uri2.host, '<span style="color:' + r.domaincolor + '">' +  uri2.host + '</span>').replace(/&d=.*$/, '')
                        // Check if is a tooltip or not
                        if (r.istooltip) {
                            position = {
                                my: 'top left',
                                target: 'mouse',
                                viewport: $(window),
                                adjust: {
                                    y: +25
                                }
                            }
                        } else {
                            position = {
                                my: r.position,
                                at: r.position,
                                target: $(window),
                                adjust: {
                                    y: ( r.position === 'left bottom' ? -20 : 0 )
                                }
                            }
                        }
                        // Is the target a new window?
                        if ( $(o).attr('target') == '_blank' ) text = '<i class="fas fa-external-link-alt" style="padding-right: 5px;"></i>' + text;
                        // Show the qtip
                        $(o).qtip({
                            overwrite: false,
                            content: {
                                text: text
                            },
                            show: {
                                event: e.type,
                                ready: true,
                                delay: r.time
                            },
                            hide: {
                                fixed: true
                            },
                            position: position,
                            style: {
                                classes: 'qtip-dark',
                                tip: {
                                    corner: false
                                }
                            }
                        }, e);
                    }
                })
            }
        },
        mouseleave: function(e){
            $(this).qtip('destroy');
        }
    }, 'a');
});
