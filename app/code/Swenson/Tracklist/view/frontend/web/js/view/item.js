define([
    'jquery',
    'ko',
    'underscore',
    'uiComponent',
    'Swenson_Tracklist/js/model/model'
], function ($, ko, _, Component, model) {
    'use strict';

    return Component.extend({

        gapText: ko.observable('+ Add Gap'),

        /**
         * @inheritDoc
         * @return {exports}
         */
        initialize: function () {
            this._super();

            return this;
        },

        /**
         * Track list from model
         * @return {*}
         */
        getTrackList: function(){
            return model.trackList;
        },

        /**
         * Remove track item from list
         * @param obj
         * @param e
         */
        removeItem: function(obj, e){
            var li = $(e.currentTarget).parents('li'),
                index = model.getItemIndex(li);

            model.watchTrackList().splice(index, 1);
            model.setData();
            li.slideUp(400, function(){
                li.remove();
            });
        },

        /**
         * Update watchList after changes (bpm, gap)
         * @param obj
         */
        updateObject: function(obj){
            model.updateObject(obj);
        },

        /**
         * Show/Hide Gap
         * @param obj
         * @param e
         */
        showGap: function(obj, e){
            $(e.currentTarget).next().slideToggle();
            $(e.currentTarget).toggleClass('active');

            model.updateObject(obj);

            /**
             * Need extra method to update watchTrackList with open/close state of Gap
             */
            $.extend(model.watchTrackList()[model.getArrayIndex(obj)], {showGap: $(e.currentTarget).hasClass('active')});
            model.setData();
        },
    });
});