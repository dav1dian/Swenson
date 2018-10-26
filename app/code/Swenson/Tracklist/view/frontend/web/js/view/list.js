define([
    'jquery',
    'uiComponent',
    'Swenson_Tracklist/js/model/model'
], function ($, Component, model) {
    'use strict';

    return Component.extend({

        /**
         * @inheritDoc
         * @return {exports}
         */
        initialize: function () {
            this._super();
            model.watchTrackList(model.trackList());

            return this;
        },

        /**
         * Init jQueryUI sortable
         * @param elem
         */
        initSortable: function(elem){
            $(elem).sortable({
                start: function(e, ui){
                    model.processOldIndex(ui);
                },
                stop: function(e, ui){
                    model.reorder(ui)
                }
            });
        },

        /**
         * Hide all tracks
         * @param obj
         * @param e
         */
        hideAll: function(obj, e){
            var children = $(e.currentTarget).parents('.sortable-list').find('ul').children();

            children.slideUp(400, function(){
                children.remove();
                model.setEmptyData()
            });
        },

        /**
         * Set default state of track list
         */
        setDefault: function(){
            model.setDefault();
        }
    });
});