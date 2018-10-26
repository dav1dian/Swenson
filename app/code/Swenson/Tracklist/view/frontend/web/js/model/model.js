define([
    'jquery',
    'ko',
    'Magento_Customer/js/customer-data'
], function ($, ko, customerData) {
    'use strict';

    /**
     * Default list of tracks
     * @type {*[]}
     */
    var defaultTrackList = [
        {trackName: 'ZEZE', artist: 'Kodak Black Featuring Travis Scott & Offset', bpm: 120, gap: 3, showGap: false},
        {trackName: 'Lucid Dreams', artist: 'Juice WRLD', bpm: 15, gap: 3, showGap: false},
        {trackName: 'Better Now', artist: 'Post Malone', bpm: 175, gap: 3, showGap: false},
        {trackName: 'MIA', artist: 'Bad Bunny Featuring Drake', bpm: 65, gap: 3, showGap: false},
        {trackName: 'Happier', artist: 'Marshmello & Bastille', bpm: 80, gap: 3, showGap: false},
        {trackName: 'Sicko Mode', artist: 'Travis Scott', bpm: 170, gap: 3, showGap: false},
        {trackName: 'Drip Too Hard', artist: 'Lil Baby & Gunna', bpm: 160, gap: 3, showGap: false},
        {trackName: 'Youngblood', artist: '5 Seconds Of Summer', bpm: 140, gap: 3, showGap: false},
        {trackName: 'Shallow', artist: 'Lady Gaga & Bradley Cooper', bpm: 50, gap: 3, showGap: false}
    ];

    /**
     * Array sorting feature
     * @param arr
     * @param old_index
     * @param new_index
     */
    function array_move(arr, old_index, new_index) {
        if (new_index >= arr.length) {
            var k = new_index - arr.length + 1;
            while (k--) {
                arr.push(undefined);
            }
        }

        arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    }

    return {
        /**
         * Track list index
         */
        oldIndex: ko.observable(),
        newIndex: ko.observable(),

        /**
         * Get tracklist from customerData if it set or from default list
         */
        trackList: ko.observableArray(
            !$.isArray(customerData.get('track-list')()) && $.isEmptyObject(customerData.get('track-list')())
                ? defaultTrackList.slice(0)
                : customerData.get('track-list')()
        ),

        /**
         * This array will be layer between to work with.
         * No need to rerender trackList every time we make changes
         */
        watchTrackList: ko.observableArray([]),

        /**
         * Set default track list
         */
        setDefault: function(){
            this.setEmptyArrays();
            this.trackList(defaultTrackList.slice(0));
            this.watchTrackList(defaultTrackList.slice(0));
            this.setData();
        },

        /**
         * Set empty list (Remove button)
         */
        setEmptyData: function(){
            this.setEmptyArrays();
            this.setData();
        },

        /**
         * Set empty track arrays
         */
        setEmptyArrays: function(){
            this.watchTrackList([]);
            this.trackList([]);
        },

        /**
         * Set customerData
         */
        setData: function(){
            customerData.set('track-list', this.watchTrackList());
        },

        /**
         * Process old index index when sorting the list
         * @param ui
         */
        processOldIndex: function(ui){
            this.setOldIndex(this.getItemIndex($(ui.item)))
        },

        /**
         * Set old index of track when sorting
         * @param index
         */
        setOldIndex: function(index){
            this.oldIndex(index);
        },

        /**
         * Set new index on sorting end
         * @param index
         */
        setNewIndex: function(index){
            this.newIndex(index);
        },

        /**
         * Get track item index in list
         * @param item
         * @return {*}
         */
        getItemIndex: function(item){
            return item.parent().children().index(item);
        },

        /**
         * Reorder track list array when sorting is finished
         * @param ui
         */
        reorder: function(ui){
            this.setNewIndex(this.getItemIndex($(ui.item)));
            array_move(this.watchTrackList(), this.oldIndex(), this.newIndex());
            this.setData();
        },

        /**
         * Get index of item object inside of watchTrackList array
         * @param obj
         * @return {*}
         */
        getArrayIndex: function(obj){
            return this.watchTrackList().indexOf(obj)
        },

        /**
         * Update track object inside of watchTrackList array
         * @param obj
         */
        updateObject: function(obj){
            var index = this.getArrayIndex(obj);

            this.watchTrackList().splice(index, 1, obj);
            this.setData();
        }

    };
});