<template>
  <div class="hello">
    <div class="loader" v-if="!data || !global">
      <img src="@/assets/Ring-Preloader.gif" width="200px"/>
    </div>
    
    <div v-if="data && global">
        <div class="global">
            <table class="globaltable unselectable">
                <tr>
                    <td>
                        <span class="today">Confirmed</span>
                        <h2>{{ Number(global.cases).toLocaleString() }}</h2>
                        <span class="today">+ {{ Number(global.todayCases).toLocaleString() }}</span>
                    </td>
                    <td>
                        <span class="today">Recovered</span>
                        <h2>{{ Number(global.recovered).toLocaleString() }}</h2>
                        <span class="today">+ {{ Number(global.todayCases).toLocaleString() }}</span>
                    </td>
                    <td>
                        <span class="today">Deaths</span>
                        <h2>{{ Number(global.deaths).toLocaleString() }}</h2>
                        <span class="today">+ {{ Number(global.todayCases).toLocaleString() }}</span>
                    </td>
                </tr>
            </table>
        </div>
        <div class="buttons">
            <div style="display: inline">
                <input placeholder="Search by Country" type="text" v-model="countryFilter" class="unselectable" />
            </div>
        </div>
        <table class="maintable unselectable" cellspacing="0" width="100%">
        <th @click="sort('country')" class="countryWidth">Country<i v-if="currentSort === 'country' && currentSortDir === 'desc'" class="fa fa-chevron-down"></i><i v-else-if="currentSort === 'country' && currentSortDir === 'asc'" class="fa fa-chevron-up"></i><i v-else class="fa fa-chevron-up white"></i></th>
        <th @click="sort('cases')">Confirmed<i v-if="currentSort === 'cases' && currentSortDir === 'desc'" class="fa fa-chevron-down"></i><i v-else-if="currentSort === 'cases' && currentSortDir === 'asc'" class="fa fa-chevron-up"></i><i v-else class="fa fa-chevron-up white"></i></th>
        <th @click="sort('deaths')">Deaths<i v-if="currentSort === 'deaths' && currentSortDir === 'desc'" class="fa fa-chevron-down"></i><i v-else-if="currentSort === 'deaths' && currentSortDir === 'asc'" class="fa fa-chevron-up"></i><i v-else class="fa fa-chevron-up white"></i></th>
        <th @click="sort('active')">Active Cases<i v-if="currentSort === 'active' && currentSortDir === 'desc'" class="fa fa-chevron-down"></i><i v-else-if="currentSort === 'active' && currentSortDir === 'asc'" class="fa fa-chevron-up"></i><i v-else class="fa fa-chevron-up white"></i></th>
        <th @click="sort('deathsPerOneMillion')">Deaths per 1m<i v-if="currentSort === 'deathsPerOneMillion' && currentSortDir === 'desc'" class="fa fa-chevron-down"></i><i v-else-if="currentSort === 'deathsPerOneMillion' && currentSortDir === 'asc'" class="fa fa-chevron-up"></i><i v-else class="fa fa-chevron-up white"></i></th>
        <tr v-for="(country, index) in sortedAndFilteredData" :key="index">
            <td><img :src="country.countryInfo.flag" class="flag" />{{ country.country }}</td>
            <td>{{ Number(country.cases).toLocaleString() }}
            <span class="today">+ {{ Number(country.todayCases).toLocaleString() }}</span>
            </td>
            <td>{{ Number(country.deaths).toLocaleString() }}
            <span class="today">+ {{ country.todayDeaths }}</span>
            </td>
            <td>{{ Number(country.active).toLocaleString() }}
            <span class="blank">.</span>
            </td>
            <td>{{ Number(country.deathsPerOneMillion).toLocaleString() }}
            <span class="blank">.</span>
            </td>
        </tr>
        </table>
        <div class="buttons">
            <button v-if="!allDataStore" @click="allCountries">View All Countries</button>
            <button v-if="allDataStore" @click="clear">Reset</button>
        </div>
    </div>
  </div>
</template>

<script>
import axios from '@/axios'

export default {
  data () {
    return {
      data: '',
      dataStore: '',
      allDataStore: false,
      global: '',
      countryFilter: '',
      newPath: '',
      currentSort: 'cases',
      currentSortDir: 'desc'
    }
  },
  props: {
    msg: String
  },
  methods: {
    sort: function (s) {
        //if s == current sort, reverse the order
        if(s === this.currentSort) {
            this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc'
        } else {
            this.currentSortDir = 'desc'
        }
        this.currentSort = s
    },
    clear: function () {
        // Reset to initial sorted data
        this.data = this.dataStore
        this.allDataStore = false
    },
    allCountries:function() {
        this.data = null
        // Request all country data
        axios.get('countries').then(response => {
        // Get Global Data
        axios.get('all').then(res => {
            this.global = res.data
        })  
        // Start working with countries data
        var data = response.data

        // Sorting by Total Cases (High to low)
        data.sort((a, b) => {
            if (a.cases < b.cases) {
            return 1
            } else {
            return -1
            }
        })
        // Set data object
        this.data = data
        this.allDataStore = true
        })
    }

  },
  computed: {
      sortedAndFilteredData:function() {
          // Set searched to equal input of the search field
          const searched = this.countryFilter.toLowerCase().trim();
          // Set searchResult to equal the result of filtering our data by country based on the input
          const searchResult = this.data.filter(c => c.country.toLowerCase().indexOf(searched) > -1);
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          // Run the sorting method on the filtered data and return the result
          return searchResult.sort((a, b) => {
            let modifier = 1
            if(this.currentSortDir === 'desc') modifier = -1
            if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier
            if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier
            return 0
        })
      }
  },
  mounted () {
    // List of countries we are pulling data for
    const countries = '/NZL,AUS,GBR,USA,CHN,KOR,BRA,RUS,ESP,ITA,FRA,DEU,CAN,SGP,CHE,IRL,JPN,DNK,SWE,VNM'
    
    // Mounting initial API Data
    axios.get('countries' + countries).then(response => {
       // Get Global Data
      axios.get('all').then(res => {
          this.global = res.data
      })
      // Set data object
      this.data = response.data
      //this.data = data
      this.dataStore = response.data
      //this.dataStore = data
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.global {
    margin: 40px 0 40px;
}
table {
  text-align: left;
  border: none;
}
.countryWidth {
    min-width: 150px;
}
th {
  cursor: pointer;
}
th,td {
  padding: 8px;
}
.maintable tr:nth-of-type(odd) { 
  background: #f1f1f1; 
}
.maintable td,
.maintable th {
    border-bottom: 1px solid #dfe1e5;
}
.globaltable {
    min-width: 600px;
}
@media only screen and (max-width: 600px) {


}
.globaltable td {
    border-right: 1px solid #dfe1e5;
}
.globaltable h2 {
    margin: 8px 0 8px;
}
.today {
  display: block;
  font-size: 0.8em;
  margin-top: 4px;
}
.blank {
  display: block;
  font-size: 0.8em;
  margin-top: 4px;
  color: #fff;
}
.buttons {
  text-align: left;
}
.hello {
  max-width: 1100px;
  margin: auto;
}
.sortToggle:hover {
  cursor: pointer;
}
.loader {
  height: 100vh;
  padding-top: 25vh;
  text-align: center;
}
.flag {
    max-width: 25px;
    margin-right: 10px;
}
.fa {
  margin-left: 5px;
}
.white {
  color: #fff;
}
*.unselectable {
   -moz-user-select: none;
   -khtml-user-select: none;
   -webkit-user-select: none;

   /*
     Introduced in Internet Explorer 10.
     See http://ie.microsoft.com/testdrive/HTML5/msUserSelect/
   */
   -ms-user-select: none;
   user-select: none;
}
button {
  padding: 20px;
  display: none;
  background: rgb(219, 241, 255);
  color: rgb(0, 110, 255);
  font-weight: bold;
  margin: 15px 15px 15px 0;
  border: none;
  cursor: pointer;
  display: inline;
  outline: none;
  border-radius: 50px;
}
input {
  padding: 20px;
  display: none;
  background: rgb(219, 241, 255);
  color: rgb(0, 110, 255);
  font-weight: bold;
  margin: 0px 0px 10px 0px;
  border: none;
  display: inline;
  outline: none;
  border-radius: 5px;
}

button:hover {
  background: #cccccc;
}

@media 
only screen and (max-width: 760px),
(min-device-width: 768px) and (max-device-width: 1024px)  {

	/* Force table to not be like tables anymore */
	table, tbody, th, td, tr { 
		display: block; 
        background-color: #fff;
	}
	
	/* Hide table headers (but not display: none;, for accessibility) */
	/*th { 
		position: absolute;
		top: -9999px;
		left: -9999px;
	}*/
	
    .maintable td:nth-of-type(1) { background-color: #eee; }

	.maintable td { 
		/* Behave  like a "row" */
		border: none;
		border-bottom: 1px solid #eee; 
		position: relative;
		padding-left: 50%; 
	}

    .globaltable td {
        text-align: center;
        border-bottom: 1px solid #eee;
        border-right: 0px;
        margin: 0px;
    }

     .globaltable {
     min-width: 0px;
     margin: 0px;
     }
	.maintable td:before { 
		/* Now like a table header */
		position: absolute;
		/* Top/left values mimic padding */
		top: 6px;
		left: 6px;
		width: 40%; 
		padding-right: 10px; 
		white-space: nowrap;
	}
	
	/*
	Label the data
	*/
	.maintable td:nth-of-type(1):before { content: "Country"; }
	.maintable td:nth-of-type(2):before { content: "Confirmed"; }
	.maintable td:nth-of-type(3):before { content: "Deaths"; }
	.maintable td:nth-of-type(4):before { content: "Active"; }
	.maintable td:nth-of-type(5):before { content: "Deaths per 1M"; }

    .buttons {
        text-align: center;
        margin: 0px;
    }
    button {
        float: right;
    }
    input {
      width: 80%;
    }
}
</style>
