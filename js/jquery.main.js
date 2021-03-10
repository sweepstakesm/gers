(function($) {
    var progressBar;
    var ajaxIsLoading, adjustFlexMenu, collapseAllExcept, flexObjects, getMax, getValue, getWidth, initClickredirect, initCookies_home, initInputAutofocus, initLightbox, insertAjaxDatas, isLast, isTouchDevice, is_horizontal_menu, last_post_page, load_last_posts, load_menu, mainMenu, max, progressBar, reloadFlexMenu, resizeTimeout, scrollPosition, setWidth, supports_html5_storage, value, width, windowHeight, windowWidth;
    $.fn.customerPopup = function(e, intWidth, intHeight, blnResize) {
        e.preventDefault();
        intWidth = intWidth || '500';
        intHeight = intHeight || '400';
        strResize = (blnResize ? 'yes' : 'no');
        var strTitle = ((typeof this.attr('title') !== 'undefined') ? this.attr('title') : 'Social Share'),
            strParam = 'width=' + intWidth + ',height=' + intHeight + ',resizable=' + strResize,
            objWindow = window.open(this.data('href'), strTitle, strParam).focus()
    }
    supports_html5_storage = function() {
        var e;
        try {
            return 'localStorage' in window && window.localStorage !== null
        } catch (_error) {
            e = _error;
            return !1
        }
    };
    adjustFlexMenu = function() {
        var windowHeight, windowWidth;
        if ($(window).width() !== windowWidth || $(window).height() !== windowHeight) {
            $(flexObjects).each(function() {
                $(this).flexMenu({
                    'undo': !0
                }).flexMenu(this.options)
            });
            windowWidth = $(window).width();
            windowHeight = $(window).height()
        }
    };
    collapseAllExcept = function($menuToAvoid) {
        var $activeMenus, $menusToCollapse;
        $activeMenus = void 0;
        $menusToCollapse = void 0;
        $activeMenus = $('li.flexMenu-viewMore.active');
        $menusToCollapse = $activeMenus.not($menuToAvoid);
        $menusToCollapse.removeClass('active').find('> ul').hide()
    };
    reloadFlexMenu = function() {
        $('.main-menus .accordion').flexMenu({
            'undo': !0
        }).flexMenu({
            linkText: 'Plus',
            cutoff: 1
        })
    };
    mainMenu = function() {
        var cutoffText;
        $('.main-menus .accordion').flexMenu({
            linkText: 'Plus',
            cutoff: 1
        })
    };
    is_horizontal_menu = function() {
        var $li = $('.menu-area .accordion > li > ul > li').length ? $('.menu-area .accordion > li > ul > li') : $('.menu-area .accordion > li');
        if ($('.menu-area .accordion > li.flexMenu-viewMore.flexMenu-allInPopup').length) {
            return !1
        }
        if ($li.offset().top !== $li.next('li').offset().top) {
            return !1
        }
        return !0
    };
    insertAjaxDatas = function(ajaxHtml) {
        var $html, $origElem, ajaxSelector, htmlContent, replaceClass;
        $html = $(ajaxHtml);
        ajaxSelector = void 0;
        htmlContent = void 0;
        $origElem = void 0;
        replaceClass = void 0;
        $('[data-ajax-target]').each(function() {
            $origElem = $(this);
            ajaxSelector = $origElem.data('ajax-target');
            replaceClass = $origElem.data('replace-class');
            if ($html.find(ajaxSelector).length) {
                htmlContent = $html.find(ajaxSelector)[0].outerHTML;
                if (replaceClass) {
                    htmlContent = htmlContent.replace(ajaxSelector.replace('.', ''), replaceClass)
                }
                $origElem.replaceWith(htmlContent)
            }
        })
    };
    load_menu = function(wrapper_menu, datacatid) {
        var args, cacheMenuId;
        cacheMenuId = '_phonandroid-menu_' + datacatid + '_' + current_menu_version;
        if (supports_html5_storage() && localStorage.getItem(cacheMenuId) && localStorage.getItem(cacheMenuId) !== '') {
            wrapper_menu.html(localStorage.getItem(cacheMenuId));
            wrapper_menu.addClass('loaded')
        } else {
            if (!wrapper_menu.find('.loading').length) {
                wrapper_menu.append('<div class="loading" />')
            }
            args = {
                action: 'load_main_nav',
                catid: datacatid,
                linktype: 'normal'
            };
            $.post('/wp-admin/admin-ajax.php', args, function(data) {
                if (data !== '') {
                    wrapper_menu.find('.loading').remove();
                    wrapper_menu.html(data);
                    if (supports_html5_storage()) {
                        localStorage.setItem(cacheMenuId, data)
                    }
                    wrapper_menu.addClass('loaded')
                } else {
                    wrapper_menu.html('erreur lors du chargement')
                }
            })
        }
    };
    var i_last_post_offset_multiplicate = 0;
    load_last_posts = function(current_page, postid, catid) {
        var args, scrollPosition;
        if (!ajaxIsLoading && last_post_page < 11 && !isLast) {
            i_last_post_offset_multiplicate++;
            $('.widget-last-posts .loading').removeClass('hidden');
            ajaxIsLoading = !0;
            scrollPosition = $(document).scrollTop();
            args = {
                action: 'load_last_posts',
                catid: catid,
                postid: postid,
                page: current_page,
                offset: i_last_post_offset_multiplicate
            };
            $.post(light_ajaxurl, args, function(data) {
                if (data === 0) {
                    isLast = !0;
                    $('.widget-last-posts .loading').addClass('hidden')
                } else {
                    $(data).insertAfter('.widget-last-posts article:last-of-type');
                    last_post_page++;
                    $(document).scrollTop(scrollPosition);
                    setTimeout((function() {
                        ajaxIsLoading = !1
                    }), 250);
                    $('.widget-last-posts .loading').addClass('hidden');
                    if (last_post_page === 10) {
                        isLast = !0
                    }
                }
            })
        }
    };
    initClickredirect = function() {
        $(document).on('click', '.clickredirect', function(e) {
            var evtobj, go_to_url, target;
            evtobj = window.event ? event : e;
            go_to_url = $(this).find('.url').attr('href');
            target = $(this).find('.url').attr('target');
            if (evtobj.ctrlKey || evtobj.metaKey || evtobj.which === 2) {
                window.open(go_to_url);
                return !1
            } else {
                if (target === '_blank') {
                    window.open(go_to_url, '_blank')
                } else {
                    document.location.href = go_to_url
                }
                return !1
            }
        });
        $('.urlcomments').click(function(e) {
            var evtobj, go_to_url;
            evtobj = window.event ? event : e;
            go_to_url = $(this).attr('href');
            if (evtobj.ctrlKey || evtobj.metaKey || evtobj.which === 2) {
                window.open(go_to_url);
                return !1
            } else {
                document.location.href = go_to_url;
                return !1
            }
        })
    };
    initCookies_home = function() {
        $('#listingtype-grid').click(function(e) {
            e.preventDefault();
            $(this).addClass('active');
            $('#listingtype-list').removeClass('active');
            $.post(theme10n.ajaxurl, {
                action: 'nw_ajaxlistingtypegrid_cookie'
            }).done(function(data) {
                $.post(theme10n.ajaxurl, {
                    action: 'nw_ajaxlistingtypelist_refresh'
                }, function(data) {
                    $('#cookie_loop').fadeOut(0).empty().append(data).fadeIn(250)
                })
            })
        });
        $('#listingtype-list').click(function(e) {
            e.preventDefault();
            $(this).addClass('active');
            $('#listingtype-grid').removeClass('active');
            $.post(theme10n.ajaxurl, {
                action: 'nw_ajaxlistingtypelist_cookie'
            }).done(function(data) {
                $.post(theme10n.ajaxurl, {
                    action: 'nw_ajaxlistingtypelist_refresh'
                }, function(data) {
                    $('#cookie_loop').fadeOut(0).empty().append(data).fadeIn(250)
                })
            })
        })
    };
    initInputAutofocus = function() {
        var addToParent, focusClass, isTouchDevice;
        isTouchDevice = /Windows Phone/.test(navigator.userAgent) || 'ontouchstart' in window || window.DocumentTouch && document instanceof DocumentTouch;
        focusClass = 'input-focused';
        addToParent = !0;
        $('.js-form-autofocus').each(function() {
            var addFocus, btn, classOwner, focusParent, form, input, removeFocus;
            form = $(this);
            focusParent = form;
            input = form.find('.js-input-autofocus');
            btn = form.find('.js-button-autofocus');
            classOwner = addToParent ? focusParent : input;
            addFocus = function() {
                classOwner.addClass(focusClass);
                input.focus()
            };
            removeFocus = function() {
                classOwner.removeClass(focusClass);
                input.blur()
            };
            if (isTouchDevice) {
                form.addClass('touch-device-form');
                btn.on('click', function(e) {
                    e.preventDefault();
                    if (!classOwner.hasClass(focusClass)) {
                        addFocus()
                    } else {
                        removeFocus();
                        $(this).parents('form:first').submit()
                    }
                })
            } else {
                btn.on('click', function(e) {
                    e.preventDefault();
                    if (!classOwner.hasClass(focusClass)) {
                        addFocus()
                    } else {
                        removeFocus();
                        $(this).parents('form:first').submit()
                    }
                })
            }
        });
        $('.js-input-autofocus').on('click touchstart', function(e) {
            $(this).addClass('clicked')
        })
    };
    initLightbox = function() {
        if ($('a[rel="lightbox"]').length > 0) {
            $('a[rel="lightbox"]').magnificPopup({
                type: 'image',
                removalDelay: 500,
                callbacks: {
                    beforeOpen: function() {
                        this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                        this.st.mainClass = this.st.el.attr('data-effect')
                    }
                },
                closeOnContentClick: !0,
                midClick: !0,
                image: {
                    tError: '<a href="%url%">l\'image</a> na pas pu être chargée'
                },
                ajax: {
                    tError: '<a href="%url%">Erreur</a> '
                },
                tClose: 'fermer (Esc)',
                tLoading: 'Chargement...'
            })
        }
        if ($('a[rel="lightboxgallery"]').length > 0) {
            $('a[rel="lightboxgallery"]').magnificPopup({
                type: 'image',
                removalDelay: 500,
                callbacks: {
                    beforeOpen: function() {
                        this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                        this.st.mainClass = this.st.el.attr('data-effect')
                    }
                },
                closeOnContentClick: !0,
                midClick: !0,
                gallery: {
                    enabled: !0,
                    tPrev: 'Précédent (calvier fleche gauche)',
                    tNext: 'Suivant (calvier fleche droite)',
                    tCounter: '%curr% sur %total%'
                },
                image: {
                    tError: '<a href="%url%">l\'image</a> na pas pu être chargée'
                },
                ajax: {
                    tError: '<a href="%url%">Erreur</a> '
                },
                tClose: 'fermer (Esc)',
                tLoading: 'Chargement...'
            })
        }
    };
    $.fn.isInViewport = function() {
        var elementBottom, elementTop, viewportBottom, viewportTop;
        elementTop = $(this).offset().top;
        elementBottom = elementTop + $(this).outerHeight();
        viewportTop = $(window).scrollTop();
        viewportBottom = viewportTop + window.innerHeight;
        return elementBottom > viewportTop && elementTop < viewportBottom
    };
    isTouchDevice = /Windows Phone/.test(navigator.userAgent) || 'ontouchstart' in window || window.DocumentTouch && document instanceof DocumentTouch;
    windowWidth = $(window).width();
    windowHeight = $(window).height();
    flexObjects = [];
    resizeTimeout = void 0;
    $(document).ready(function($) {
        var $el = $('#conclusion-test');
        if ($el.length) {
            getMax = function() {
                var bottom = $el.position().top + $el.outerHeight(!0);
                return bottom
            };
            getValue = function() {
                return $(window).scrollTop()
            };
            if ('max' in document.createElement('progress')) {
                progressBar = $('progress');
                progressBar.attr({
                    max: getMax()
                });
                $(document).on('scroll', function() {
                    progressBar.attr({
                        value: getValue()
                    })
                });
                $(window).resize(function() {
                    progressBar.attr({
                        max: getMax(),
                        value: getValue()
                    })
                })
            } else {
                progressBar = $('.progress-bar');
                max = getMax();
                value = void 0;
                width = void 0;
                getWidth = function() {
                    value = getValue();
                    width = value / max * 100;
                    width = width + '%';
                    return width
                };
                setWidth = function() {
                    progressBar.css({
                        width: getWidth()
                    })
                };
                $(document).on('scroll', setWidth);
                $(window).on('resize', function() {
                    max = getMax();
                    setWidth()
                })
            }
        }
    });
    ajaxIsLoading = !1;
    last_post_page = 2;
    isLast = !1;
    scrollPosition = 0;
    $.fn.flexMenu = function(options) {
        var checkFlexObject, s;
        checkFlexObject = void 0;
        s = $.extend({
            'threshold': 2,
            'cutoff': 2,
            'linkText': 'Plus',
            'linkTitle': 'Voir Plus',
            'linkTextAll': 'Menu',
            'linkTitleAll': 'Open/Close Menu',
            'showOnHover': !0,
            'popupAbsolute': !0,
            'popupClass': '',
            'undo': !1
        }, options);
        this.options = s;
        checkFlexObject = $.inArray(this, flexObjects);
        if (checkFlexObject >= 0) {
            flexObjects.splice(checkFlexObject, 1)
        } else {
            flexObjects.push(this)
        }
        return this.each(function() {
            var $firstItem, $items, $lastChild, $lastItem, $menu, $moreItem, $moreLink, $popup, $this, allInPopup, firstItemHeight, firstItemTop, i, keepLooking, needsMenu, numItems, numToRemove;
            $this = $(this);
            $items = $this.find('> li');
            $firstItem = $items.first();
            $lastItem = $items.last();
            numItems = $this.find('li').length;
            firstItemTop = Math.floor($firstItem.offset().top);
            firstItemHeight = Math.floor($firstItem.outerHeight(!0));
            $lastChild = void 0;
            keepLooking = void 0;
            $moreItem = void 0;
            $moreLink = void 0;
            numToRemove = void 0;
            allInPopup = !1;
            $menu = void 0;
            i = void 0;
            needsMenu = function($itemOfInterest) {
                var result;
                result = Math.ceil($itemOfInterest.offset().top) >= firstItemTop + firstItemHeight ? !0 : !1;
                return result
            };
            if (needsMenu($lastItem) && numItems > s.threshold && !s.undo && $this.is(':visible')) {
                $popup = $('<ul class="flexMenu-popup" style="display:none;' + (s.popupAbsolute ? ' position: absolute;' : '') + '"></ul>');
                $popup.addClass(s.popupClass);
                i = numItems;
                while (i > 1) {
                    $lastChild = $this.find('> li:last-child');
                    keepLooking = needsMenu($lastChild);
                    if (i - 1 <= s.cutoff) {
                        $($this.children().get().reverse()).appendTo($popup);
                        allInPopup = !0;
                        break
                    }
                    if (!keepLooking) {
                        break
                    } else {
                        $lastChild.appendTo($popup)
                    }
                    i--
                }
                if (allInPopup) {
                    $this.append('<li class="flexMenu-viewMore flexMenu-allInPopup"><a href="#" title="' + s.linkTitleAll + '">' + s.linkTextAll + '</a></li>')
                } else {
                    $this.append('<li class="flexMenu-viewMore"><a href="#" title="' + s.linkTitle + '">' + s.linkText + '</a></li>')
                }
                $moreItem = $this.find('> li.flexMenu-viewMore');
                if (needsMenu($moreItem)) {
                    $this.find('> li:nth-last-child(2)').appendTo($popup)
                }
                $popup.children().each(function(i, li) {
                    $popup.prepend(li)
                });
                $moreItem.append($popup);
                $moreLink = $this.find('> li.flexMenu-viewMore > a');
                $moreLink.click(function(e) {
                    collapseAllExcept($moreItem);
                    $popup.toggle();
                    $moreItem.toggleClass('active');
                    e.preventDefault()
                });
                if (s.showOnHover && typeof Modernizr !== 'undefined' && !Modernizr.touch) {
                    $moreItem.hover((function() {
                        $popup.show();
                        $(this).addClass('active')
                    }), function() {
                        $popup.hide();
                        $(this).removeClass('active')
                    })
                }
            } else if (s.undo && $this.find('ul.flexMenu-popup')) {
                $menu = $this.find('ul.flexMenu-popup');
                numToRemove = $menu.find('li').length;
                i = 1;
                while (i <= numToRemove) {
                    $menu.find('> li:first-child').appendTo($this);
                    i++
                }
                $menu.remove();
                $this.find('> li.flexMenu-viewMore').remove()
            }
        })
    };
    $(document).ready(function() {
        var $mobileSlider, homeHTML, idNavCheckbox, isSticky, limitScroll, menu_catid, res, slickResponsive, targetHash, textShare, that, that2, urlShare;
        initClickredirect();
        initInputAutofocus();
        initCookies_home();
        initLightbox();
        mainMenu();
        $('.tab-nav').flexMenu({
            linkText: 'Plus',
            cutoff: 1
        });
        $(window).resize(function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout((function() {
                adjustFlexMenu()
            }), 200)
        });
        if (typeof $.fn.slick != 'undefined') {
            $mobileSlider = $('.featured-grid').clone();
            $mobileSlider.find('.item').unwrap('li').unwrap('ul');
            $mobileSlider.removeClass('featured-grid').addClass('mobile-slider');
            $mobileSlider.prependTo('.mobile-slider-container');
            slickResponsive = [];
            res = 5;
            while (res <= 11) {
                slickResponsive.push({
                    breakpoint: res * 80,
                    settings: {
                        slidesToShow: Math.round(res * 70 / 300 * 10) / 10,
                        slidesToScroll: Math.floor(res * 80 / 300)
                    }
                });
                res++
            }
            slickResponsive.push({
                breakpoint: 960,
                settings: {
                    settings: 'unslick'
                }
            });
            $('.mobile-slider').slick({
                mobileFirst: !0,
                dots: !1,
                infinite: !1,
                slidesToShow: 1.3,
                slidesToScroll: 1,
                arrows: !1,
                responsive: slickResponsive
            });
            $('.responsive').slick({
                dots: !0,
                infinite: !1,
                speed: 300,
                slidesToShow: 4,
                slidesToScroll: 4,
                responsive: [{
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: !0,
                        dots: !0
                    }
                }, {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                }, {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }]
            })
        }
        if ($('.fx-toc').length && typeof $.fn.stickybits != 'undefined') {
            $('.single-post-container .fx-toc').stickybits({
                useStickyClasses: !0,
                stickyBitStickyOffset: $('#progressBar').length ? 5 : 0
            })
        } else if ($('.single-post-container .share-box').length && typeof $.fn.stickybits != 'undefined') {
            $('.single-post-container .share-box').stickybits({
                useStickyClasses: !0,
                stickyBitStickyOffset: $('#progressBar').length ? 5 : 0
            })
        }
        if ($('#conclusion-test').length) {
            var $clone = $('#conclusion-test').clone();
            $clone.attr('id', 'header-resume-test');
            $clone.find('.holder').remove();
            $clone.find('.heading').text('Notre avis')
            $clone.wrapInner('<div class="inner-wrapper-header-test" />');
            $clone.insertAfter('.test-post-header')
        }
        if ($('.share-box').length) {
            textShare = $('.us_share_buttons').data('text');
            urlShare = $('.us_share_buttons').data('url');
            $('.us_whatsapp .us_box').attr('href', 'whatsapp://send?text=' + textShare + ' ' + urlShare)
        }
        $(document).on('click', '[data-href]:not(.share-popup)', function() {
            var win;
            if ($(this).data('target') === '_blank' || $(this).attr('target') === '_blank') {
                win = window.open($(this).data('href'), '_blank');
                win.focus()
            } else {
                window.location.href = $(this).data('href')
            }
        });
        if ($('#sidebar.nwscrollsidebar').length && typeof $.fn.stickybits != 'undefined') {
            $('#sidebar.nwscrollsidebar').stickybits({
                useStickyClasses: !0,
                stickyBitStickyOffset: 10
            })
        }
        if ($('#comment-sidebar.nwscrollsidebar').length && typeof $.fn.stickybits != 'undefined') {
            $('#comment-sidebar.nwscrollsidebar').stickybits({
                useStickyClasses: !0,
                stickyBitStickyOffset: 10
            })
        }
        window.ctwallpaperCB = function() {
            reloadFlexMenu()
        };
        that = void 0;
        that2 = void 0;
        if (!$('#XF').length) {
            $(document).ready(function() {
                var checkWallpaper, k;
                reloadFlexMenu();
                k = 0;
                checkWallpaper = setInterval((function() {
                    if ($('html').width() > $('body').width()) {
                        $('body').addClass('ct_wallpaper')
                    }
                    if (k === 15) {
                        reloadFlexMenu();
                        clearInterval(checkWallpaper)
                    }
                    k++
                }), 500)
            })
        }
        $(document).on('click', 'body', function(evt) {
            var idInput;
            idInput = $('.toggle-opener:checked').attr('id');
            if (!$(evt.target).is('label') && !$(evt.target).closest('label').length && !$(evt.target).is('.toggle-opener') && !$(evt.target).closest('.toggle-container').prev('label[for="' + idInput + '"]').length) {
                $('.toggle-opener:checked').prop('checked', !1)
            }
        });
        const subMenuDepth1 = $('.menu-item-has-children.sub-1 > ul.sub-terms');
        subMenuDepth1.each(function() {
            this.style.display = "none"
        });
        let subMenuDepth1StartHeight;
        $(document).on('change', '.toggle-opener', function(e) {
            that = $(this);
            if (!that.closest('.sub-menu').length && that.prop('checked')) {
                $('.toggle-opener').each(function() {
                    if (!$(this).is(that)) {
                        that2 = $(this);
                        if (!that.closest('.toggle-container').prevAll('.toggle-opener').is(that2)) {
                            $(this).prop('checked', !1);
                            $('.flexMenu-popup').hide();
                            $('.search-field').focus()
                        }
                    }
                })
            } else {
                if (window.matchMedia("(max-width: 768px)").matches) {
                    const heightDivMenu = e.target.parentElement.parentElement.parentElement.clientHeight;
                    let newHeightDiv;
                    $('.toggle-container.handeld-only.loaded').css('height', 'auto');
                    if (that[0].id !== 'nav-opener') {
                        if (that.prop('checked') === !0) {
                            if (e.target.parentElement.parentElement.parentElement.clientHeight < (e.target.nextSibling.children[2].children[2].clientHeight + 46)) {
                                newHeightDiv = e.target.nextSibling.children[2].children[2].clientHeight + 57;
                                $(e.target.parentElement.parentElement.parentElement).css('height', newHeightDiv)
                            }
                        } else {
                            $(e.target.parentElement.parentElement.parentElement).css('height', 'auto')
                        }
                    }
                    $('.menu-item-has-children.sub-1 > label').on('click', function(e) {
                        let initialHeight = $(e.target.parentElement.parentElement.parentElement)[0].clientHeight;
                        if ($(e.currentTarget).siblings('ul.sub-terms')[0].clientHeight === 0) {
                            $(e.currentTarget).siblings('ul.sub-terms')[0].style.display = "flex";
                            subMenuDepth1StartHeight = $(e.currentTarget).siblings('ul.sub-terms')[0].clientHeight;
                            $(e.target.parentElement.parentElement.parentElement).css('height', (newHeightDiv + subMenuDepth1StartHeight))
                        } else {
                            subMenuDepth1StartHeight = $(e.currentTarget).siblings('ul.sub-terms')[0].clientHeight;
                            $(e.currentTarget).siblings('ul.sub-terms')[0].style.display = "none";
                            $(e.target.parentElement.parentElement.parentElement).css('height', (initialHeight - subMenuDepth1StartHeight))
                        }
                    })
                }
            }
        });
        const pageContentHeight = $('#ctBoc')[0].clientHeight;
        $(document).on('change', '.toggle-opener', function() {
            const pageContent = $('#ctBoc');
            if ($('#nav-opener').prop('checked')) {
                pageContent.css('height', 0);
                pageContent.css('overflow', 'hidden')
            } else {
                pageContent.css('height', 'auto');
                pageContent.css('overflow', 'auto')
            }
        });
        $('.home-top-nav').on('click', '.title-tabs', function() {
            $(this).toggleClass('active')
        });
        homeHTML = void 0;
        if (supports_html5_storage() && localStorage.getItem('_curHomeHtmlv4') && $('body.home:not(.paged)').length) {
            localStorage.setItem('_curHomeHtmlv4', $('html')[0].outerHTML)
        }
        if (typeof ajaxurl == 'undefined') {
            var current_menu_version = '15302123126543';
            var ajaxurl = '//' + window.location.hostname + '/wp-admin/admin-ajax.php';
            var light_ajaxurl = '//' + window.location.hostname + '/wp-content/themes/phonadroid-v3/ajax.php'
        }
        if (supports_html5_storage() && localStorage.getItem('_curHomeHtmlv4') && localStorage.getItem('_curHomeHtmlv4') !== '') {
            homeHTML = localStorage.getItem('_curHomeHtmlv4');
            insertAjaxDatas(homeHTML)
        } else {
            $.ajax({
                url: ajaxurl.replace('/wp-admin/admin-ajax.php', ''),
                success: function(homeHTML) {
                    if (supports_html5_storage()) {
                        localStorage.setItem('_curHomeHtmlv4', homeHTML);
                        insertAjaxDatas(homeHTML)
                    }
                }
            })
        }
        if ($('.fx-toc').length) {
            isSticky = !1;
            limitScroll = $('.fx-toc').offset().top + $('.fx-toc').outerHeight() / 2;
            $(window).on('scroll', function() {
                if (!isSticky && $('.fx-toc').hasClass('js-is-sticky') && !$('.fx-toc').hasClass('collapsed')) {
                    if ($(document).scrollTop() >= limitScroll) {
                        $('.fx-toc').addClass('collapsed');
                        isSticky = !0
                    }
                }
            });
            targetHash = void 0;
            $('.fx-toc-list').on('click', 'a', function(event) {
                $('.fx-toc').addClass('collapsed');
                targetHash = $(this).attr('href').split('#')[1]
            });
            $('.fx-toc').on('click', '.fx-toc-title', function() {
                $(this).closest('.fx-toc').toggleClass('collapsed')
            })
        }
        idNavCheckbox = void 0;
        $('.menu-area .accordion').on('click touchstart', 'label:has(a), label:has(span)', function(e) {
            var divcontentloader, menu_catid;
            idNavCheckbox = '#' + $(this).attr('for');
            if (!$(this).closest('.sub-menu').length && !is_horizontal_menu() && !$(idNavCheckbox).prop('checked')) {
                divcontentloader = $(this).next('.toggle-container');
                if (divcontentloader.length && !divcontentloader.hasClass('loaded')) {
                    menu_catid = $(this).data('cat');
                    load_menu(divcontentloader, menu_catid)
                }
            }
        });
        menu_catid = void 0;
        $('.menu-area  .accordion').on('mouseenter', 'label', function() {
            var divcontentloader;
            if (is_horizontal_menu()) {
                divcontentloader = $(this).next('.toggle-container');
                if (!$(this).closest('.sub-menu').length && divcontentloader.length && !divcontentloader.hasClass('loaded')) {
                    menu_catid = $(this).data('cat');
                    load_menu(divcontentloader, menu_catid)
                }
            }
        });
        $(window).on('resize scroll', function() {
            if ($('.widget-last-posts article:last-of-type').length && $('.widget-last-posts article:last-of-type').isInViewport()) {
                load_last_posts(last_post_page, $('.widget-last-posts').data('post-id'), $('.widget-last-posts').data('cat-id'))
            }
        });
        $('.widget-last-posts').on('click', '.seemore', function(event) {
            event.preventDefault();
            load_last_posts(last_post_page, $(this).closest('.widget-last-posts').data('post-id'), $(this).closest('.widget-last-posts').data('cat-id'))
        });
        $('.share-popup').on("click", function(e) {
            $(this).customerPopup(e)
        });

        function str_rot13(str) {
            return (str + '').replace(/[a-z]/gi, function(s) {
                return String.fromCharCode(s.charCodeAt(0) + (s.toLowerCase() < 'n' ? 13 : -13))
            })
        }

        function linkAction(e) {
            window.location = str_rot13(e.getAttribute("data-href"))
        }
        $('.arrows-pagination').on('click', function() {
            window.location = str_rot13($(this).attr('href-obs'));
            return !1
        });
        $(document).ready(function($) {
            $.post('/wp-admin/admin-ajax.php', {
                action: 'phon_load_footer_menu'
            }, function(data) {
                $(data).insertAfter('#footer #footer-company-logo')
            })
        });
        $("#didomi_phonandroid").click(function(e) {
            Didomi.preferences.show();
            e.preventDefault()
        });
        moveSidebarIfMobile()
    });

    function moveSidebarIfMobile() {
        var idElementMobile = document.getElementById("#sidebar");
        if ($("body").hasClass('home')) {
            if ($(window).width() < 961 && idElementMobile === null) {
                let elem = $(".nw-right-sidebar");
                let tag = $("<div>", {
                    "class": "container"
                });
                let tag2 = $("<div>", {
                    "class": "nw-right-sidebar"
                });
                let tag3 = $("<div>", {
                    "id": "#sidebar"
                });
                let elemHtml = elem.html();
                tag3 = tag3.append(elemHtml);
                tag2 = tag2.append(tag3);
                tag = tag.append(tag2);
                tag.insertAfter(".bonsplans-container");
                elem.remove()
            }
        }
    }
})(jQuery)