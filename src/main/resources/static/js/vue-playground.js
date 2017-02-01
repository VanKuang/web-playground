window.onload = function () {
    var baseURL = "http://localhost:8080/";

    var app = new Vue({
        el: "#app",
        data: {
            message: "Hello world!",
            title: "Now is " + new Date()
        }
    });

    var app1 = new Vue({
        el: "#app1",
        data: {
            visible: true
        }
    });

    var app2 = new Vue({
        el: "#app2",
        data: {
            elements: [
                {name: "Kobe"},
                {name: "James"},
                {name: "Curry"}
            ]
        }
    });

    var app3 = new Vue({
        el: "#app3",
        data: {
            message: "Hello world"
        },
        methods: {
            reverse: function () {
                this.message = this.message.split("").reverse().join("")
            }
        }
    });

    var app4 = new Vue({
        el: "#app4",
        data: {
            message: "Hello world"
        }
    });

    Vue.component("players", {
        props: ["player"],
        template: "<li>{{ player.name }}</li>"
    });

    var app5 = new Vue({
        el: "#app5",
        data: {
            players: [
                {name: "KB"},
                {name: "LBJ"},
                {name: "SC"}
            ]
        }
    });

    Vue.component('grid', {
        template: '#grid-template',
        props: {
            data: Array,
            columns: Array,
            filterKey: String
        },
        data: function () {
            var sortOrders = {};
            this.columns.forEach(function (key) {
                sortOrders[key] = 1
            });
            return {
                sortKey: '',
                sortOrders: sortOrders
            }
        },
        computed: {
            filteredData: function () {
                var sortKey = this.sortKey;
                var filterKey = this.filterKey && this.filterKey.toLowerCase();
                var order = this.sortOrders[sortKey] || 1;
                var data = this.data;
                if (filterKey) {
                    data = data.filter(function (row) {
                        return Object.keys(row).some(function (key) {
                            return String(row[key]).toLowerCase().indexOf(filterKey) > -1
                        })
                    })
                }
                if (sortKey) {
                    data = data.slice().sort(function (a, b) {
                        a = a[sortKey];
                        b = b[sortKey];
                        return (a === b ? 0 : a > b ? 1 : -1) * order
                    })
                }
                return data
            }
        },
        filters: {
            capitalize: function (str) {
                return str.charAt(0).toUpperCase() + str.slice(1)
            }
        },
        methods: {
            sortBy: function (key) {
                this.sortKey = key;
                this.sortOrders[key] = this.sortOrders[key] * -1
            }
        }
    });

    var app6 = new Vue({
        el: '#app6',
        data: {
            searchQuery: '',
            gridColumns: ['id', 'name', 'height', 'position', 'club'],
            gridData: []
        },
        mounted: function () {
            this.loadData();
        },
        methods: {
            loadData: function () {
                this.$http.get(baseURL + "players")
                    .then(function (response) {
                        console.log(response);
                        this.gridData = response.data;
                    })
                    .catch(function (error) {
                        console.error(error);
                        this.gridData = [
                            {id: 1, name: "Kobe", height: 6.9, position: "PG", club: "Lakers"},
                            {id: 2, name: "Curry", height: 6.3, position: "PG", club: "Warriors"}
                        ]
                    });
            }
        }
    });
};