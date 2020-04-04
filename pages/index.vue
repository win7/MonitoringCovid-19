<template>
	<div class="container-fluid">
		<div class="fade-in">
			<div class="row">
				<div class="col-md-6">
					<div class="card">
						<div class="card-header"> Datos de Consulta
							<div class="card-header-actions"><a class="card-header-action" href="#"><small class="text-muted">docs</small></a></div>
						</div>
						<div class="card-body">
							<div class="form-group row">
								<label class="col-md-3 col-form-label" for="select1"> Departamento: </label>
								<div class="col-md-9">
									<select class="form-control" id="select1" name="select1" v-on:change="onChange">
										<option v-for="item, index in deparments" v-bind:key="index" v-bind:value="index"> {{ item }} </option>
									</select>
								</div>
							</div>
							<img class="c-avatar-img" src="img/covid.png" alt="cuidados">
						</div>
					</div>
					<div class="row">
						<div class="col-sm-6 col-lg-6">
							<div class="card text-white bg-gradient-success">
								<div class="card-body card-body pb-0 d-flex justify-content-between align-items-start">
									<div>
										<div class="text-value-lg"> [{{ total_healthy }}] </div>
										<div> Recuperados (Glogal) </div>
									</div>
									<!-- <div class="btn-group">
										<button class="btn btn-transparent dropdown-toggle p-0" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
											<svg class="c-icon">
												<use xlink:href="vendors/@coreui/icons/svg/free.svg#cil-settings"></use>
											</svg>
										</button>
										<div class="dropdown-menu dropdown-menu-right"><a class="dropdown-item" href="#">Action</a><a class="dropdown-item" href="#">Another action</a><a class="dropdown-item" href="#">Something else here</a></div>
									</div> -->
								</div>
								<!-- <div class="c-chart-wrapper mt-3 mx-3" style="height:70px;">
									<canvas class="chart" id="card-chart1" height="70"></canvas>
								</div> -->
								<svg class="c-sidebar-nav-icon mb-3 mx-3">
									<use xlink:href="vendors/@coreui/icons/svg/free.svg#cil-smile"></use>
								</svg>
							</div>
						</div>
						<!-- /.col-->
						<div class="col-sm-6 col-lg-6">
							<div class="card text-white bg-gradient-warning">
								<div class="card-body card-body pb-0 d-flex justify-content-between align-items-start">
									<div>
										<div class="text-value-lg"> [{{ total_infected }}] </div>
										<div> Infectados </div>
									</div>
								</div>
								<svg class="c-sidebar-nav-icon mb-3 mx-3">
									<use xlink:href="vendors/@coreui/icons/svg/free.svg#cil-medical-cross"></use>
								</svg>
							</div>
						</div>
						<!-- /.col-->
						<div class="col-sm-6 col-lg-6">
							<div class="card text-white bg-gradient-info">
								<div class="card-body card-body pb-0 d-flex justify-content-between align-items-start">
									<div>
										<div class="text-value-lg"> [{{ total_discard }}] </div>
										<div> Descartados (Global) </div>
									</div>
								</div>
								<svg class="c-sidebar-nav-icon mb-3 mx-3">
									<use xlink:href="vendors/@coreui/icons/svg/free.svg#cil-heart"></use>
								</svg>
							</div>
						</div>
						<!-- /.col-->
						<div class="col-sm-6 col-lg-6">
							<div class="card text-white bg-gradient-danger">
								<div class="card-body card-body pb-0 d-flex justify-content-between align-items-start">
									<div>
										<div class="text-value-lg"> [{{ total_dead }}] </div>
										<div> Fallecidos </div>
									</div>
								</div>
								<svg class="c-sidebar-nav-icon mb-3 mx-3">
									<use xlink:href="vendors/@coreui/icons/svg/free.svg#cil-frown"></use>
								</svg>
							</div>
						</div>
						<!-- /.col-->
					</div>
				</div>
				<div class="col-md-6">
					<div class="card">
						<div class="card-header"> Mapa Geográfico
							<div class="card-header-actions"><a class="card-header-action" href="http://www.chartjs.org" target="_blank"><small class="text-muted">docs</small></a></div>
						  </div>
						<div class="card-body">
							<div class="c-chart-wrapper"">
								<div id="mapid"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- /.row-->
			<!-- /.card-->
			<div class="row">
				<div class="col-md-6">
					<div class="card">
						<div class="card-header">Evolución de Casos
							<div class="card-header-actions"><a class="card-header-action" href="http://www.chartjs.org" target="_blank"><small class="text-muted">docs</small></a></div>
						  </div>
						<div class="card-body">
							<div class="c-chart-wrapper"">
								<canvas id="main-chart"></canvas>
							</div>
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="card">
						<div class="card-header">Factor de Propagación
							<div class="card-header-actions"><a class="card-header-action" href="http://www.chartjs.org" target="_blank"><small class="text-muted">docs</small></a></div>
						</div>
						<div class="card-body">
							<div class="c-chart-wrapper">
								<canvas id="canvas-factor"></canvas>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Logo from '~/components/Logo.vue'

	import localData from "@/static/data.json";

	export default {
		name: "Index",
		components: {

		},
		data () {
			return {
				welcome: "Index",
				deparments: [],
				date: [],
				infected: [],
				discard: [],
				healthy: [],
				dead: [], 
				factor: [], 

				total_infected: 0,
				total_discard: 0,
				total_healthy: 0,
				total_dead: 0, 

				lineChart: null,
				barChart: null,

				map: null,
				marker: null,
				latitude: 0,
				longitude: 0
			}
		},
		methods: {
			async getConfirm () {
				await this.$axios.get("/countries/PE").then((response) => {
					console.log(response.data);
				})
				.catch((error) => {
					console.log(error.response);
				});
			},
			loadDeparmet () {
				/* localData.forEach(item => {
					this.deparments.push(item.deparment);
				}); */

				localData.deparments.forEach(item => {
					this.deparments.push(item.name);

					if (item.number != 0) {
						let current = [item.latitude, item.longitude];
						let total_infected = 0
						for(let k = 0; k < localData.data.length;  k++) {
							total_infected += localData.data[k].infected[item.number];
						}
						L.circle(current, 50 * total_infected, {
							color: '#db3236',
							fillColor: '#db3236',
							fillOpacity: 0.4,
							opacity: 0.8,
							weight: 1
						})
						.bindTooltip(String(total_infected) , {direction: 'right', permanent: true, offset: [0, 0], className: 'class-tooltip'})
						.addTo(this.map);
					}
				});
			},
			loadData (index) {
				this.latitude = localData.deparments[index].latitude;
				this.longitude = localData.deparments[index].longitude;

				this.date = [];
				this.infected = [];
				this.discard = [];
				this.healthy = [];
				this.dead = [];
				this.factor= [];

				this.total_infected = 0;
				this.total_discard = 0;
				this.total_healthy = 0;
				this.total_dead = 0;

				for(let k = 0; k < localData.data.length;  k++) {
					this.date.push(localData.data[k].date);

					this.total_infected += localData.data[k].infected[index];
					this.infected.push(this.total_infected);

					this.total_discard = localData.data[k].discard[0];
					this.discard.push(this.total_discard);

					this.total_healthy += localData.data[k].healthy[0];
					this.healthy.push(localData.data[k].healthy[index]);

					this.total_dead += localData.data[k].dead[index];
					this.dead.push(localData.data[k].dead[index]);

					let f = 0;
					if (k < localData.data.length - 1 && this.total_infected != 0) {
						f = (localData.data[k + 1].infected[index] + this.total_infected) / this.total_infected;
					}
					this.factor.push(f.toFixed(2));
				}
				// this.F.shift();
				const arraySum = array => array.reduce((a, b) => a + b, 0)
				this.factor[0] = 0;

				this.updateData(this.lineChart, this.date, [this.healthy, this.infected, this.dead]);
				this.updateData(this.barChart, this.date, [this.factor]);

				let lat_lon = L.latLng(this.latitude, this.longitude);
				this.marker.setLatLng(lat_lon);
				this.map.panTo([this.latitude, this.longitude]);
			},
			createLine () {
				this.lineChart = new Chart(document.getElementById('main-chart'), {
					type: 'line',
					data: {
						labels: [],
						datasets: [{
							label: 'Recuperados',
							backgroundColor: 'rgba(220, 220, 220, 0.2)',
							borderColor: 'rgba(46, 184, 92, 1)',
							pointBackgroundColor: 'rgba(46, 184, 92, 1)',
							pointBorderColor: '#fff',
							data: []
						},{
							label: 'Infectados',
							backgroundColor: 'rgba(220, 220, 220, 0.2)',
							borderColor: 'rgba(249, 177, 21, 1)',
							pointBackgroundColor: 'rgba(249, 177, 21, 1)',
							pointBorderColor: '#fff',
							data: []
						}, /* {
							label: 'Descartados',
							backgroundColor: 'rgba(151, 187, 205, 0.2)',
							borderColor: 'rgba(1, 153, 255, 1)',
							pointBackgroundColor: 'rgba(1, 153, 255, 1)',
							pointBorderColor: '#fff',
						  data: this.discard
						}, */ {
							label: 'Fallecidos',
							backgroundColor: 'rgba(220, 220, 220, 0.2)',
							borderColor: 'rgba(229, 83, 83, 1)',
							pointBackgroundColor: 'rgba(229, 83, 83, 1)',
							pointBorderColor: '#fff',
							data: []
						}]
					},
					options: {
						responsive: true
					}
				});
			},
			createBar () {
				this.barChart = new Chart(document.getElementById('canvas-factor'), {
					type: 'bar',
					data: {
						labels: [],
						datasets: [{
							label: 'Factor de Propagación',
							backgroundColor: 'rgba(46, 184, 92, 0.5)',
							borderColor: 'rgba(46, 184, 92, 0.8)',
							highlightFill: 'rgba(46, 184, 92, 0.75)',
							highlightStroke: 'rgba(46, 184, 92, 1)',
							data: []
						}]
					},
					options: {
						responsive: true
					}
				}); 
			},
			onChange(event) {
				console.log(event.target.value);
				this.loadData(event.target.value);
			},
			addData(chart, label, data) {
				chart.config.data.labels.push(label);
				chart.config.data.datasets.forEach((dataset) => {
					dataset.data.push(data);
				});
				chart.update();
			},
			updateData(chart, label, data) {
				chart.config.data.labels = label;
				chart.config.data.datasets.forEach((dataset, index) => {
					dataset.data = data[index];
				});
				chart.update();
			},
			removeData(chart) {
				if (chart != null) {
					chart.data.labels.pop();
					chart.data.datasets.forEach((dataset) => {
						dataset.data.pop();
					});
					chart.update();
				}
			},
			clearChart (chart) {
				if (chart != null) {
					// chart.clear();
					chart.destroy();
					// chart.reset();
				}
			},
			createMap () {
				let current = [this.latitude, this.longitude];
				this.map = L.map("mapid", {
					center: current,
					zoom: 5,
					layers: [
						L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
							attribution: "&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
						})
					]
				});
				this.marker = L.marker(current, {
					draggable: false
				}).addTo(this.map);
			},
		},
		computed: {

		},
		filters: {

		},
		beforeCreate () {
			console.log("1 - Index beforeCreate");
		},
		created () {
			console.log("2 - Index created");
		},
		beforeMount () {
			console.log("3 - Index beforeMount");
		},
		mounted () {
			console.log("4 - Index mounted");

			this.createLine();
			this.createBar();

			this.createMap();

			this.loadDeparmet();
			this.loadData(0);
		},
		beforeUpdate () {
			console.log("5 - Index beforeUpdate");
		},
		updated () {
			console.log("6 - Index updated");
		},
		beforeDestroy () {
			console.log("7 - Index beforeDestroy");
		},
		destroyed () {
			console.log("8 - Index destroyed");
		}
	}
</script>

<style>

</style>
