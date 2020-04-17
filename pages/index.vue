<template>
	<div class="container-fluid">
		<div class="fade-in">
			<div class="row">
				<div class="col-sm-12 col-md-6 col-lg-3">
					<div class="card">
						<div class="card-header"> Datos de Consulta <span class="font-weight-bold"> {{ deparment }} </span>
							<div class="card-header-actions"><a class="card-header-action" href="#"><small class="text-muted">docs</small></a></div>
						</div>
						<div class="card-body">
							<div class="form-group row">
								<!-- <label class="col-md-3 col-form-label" for="select1"> Departamento: </label> -->
								<div class="col-md-12">
									<select class="form-control" id="select1" name="select1" v-on:change="onChange" v-model.trim="deparment_index">
										<option v-for="item, index in deparments" v-bind:key="index" v-bind:value="index"> {{ item }} </option>
									</select>
								</div>
							</div>
							<img class="c-avatar-img" src="img/covid.png" alt="cuidados">
						</div>
					</div>
					<div class="card">
						<div class="card-header"> Resumen <span class="font-weight-bold"> {{ deparment }} </span>
							<div class="card-header-actions"><a class="card-header-action" href="#"><small class="text-muted">docs</small></a></div>
						</div>
						<div class="card-body">
							<div class="row">
								<!-- <div class="col-sm-12 col-md-12 col-lg-12">
									<div class="card overflow-hidden">
										<div class="card-body p-0 d-flex align-items-center">
											<div class="bg-success p-4 mfe-3">
												<svg class="c-icon c-icon-xl">
													<use xlink:href="vendors/@coreui/icons/svg/free.svg#cil-smile"></use>
												</svg>
											</div>
											<div>
												<div class="text-value text-success"> [{{ total_healthy }}] </div>
												<div class="text-muted text-uppercase font-weight-bold small"> Recuperados (Nacional) </div>
											</div>
										</div>
									</div>
								</div> -->
								<!-- /.col-->
								<div class="col-sm-12 col-md-12 col-lg-12">
									<div class="card overflow-hidden">
										<div class="card-body p-0 d-flex align-items-center">
											<div class="bg-warning p-4 mfe-3">
												<svg class="c-icon c-icon-xl">
													<use xlink:href="vendors/@coreui/icons/svg/free.svg#cil-medical-cross"></use>
												</svg>
											</div>
											<div>
												<div class="text-value text-warning"> [{{ total_infected }}] </div>
												<div class="text-muted text-uppercase font-weight-bold small"> Confirmados </div>
											</div>
										</div>
									</div>
								</div>
								<!-- /.col-->
								<!-- <div class="col-sm-12 col-md-12 col-lg-12">
									<div class="card overflow-hidden">
										<div class="card-body p-0 d-flex align-items-center">
											<div class="bg-info p-4 mfe-3">
												<svg class="c-icon c-icon-xl">
													<use xlink:href="vendors/@coreui/icons/svg/free.svg#cil-heart"></use>
												</svg>
											</div>
											<div>
												<div class="text-value text-info"> [{{ total_discard }}] </div>
												<div class="text-muted text-uppercase font-weight-bold small"> Descartados (Nacional) </div>
											</div>
										</div>
									</div>
								</div> -->
								<!-- /.col-->
								<div class="col">
									<div class="card overflow-hidden">
										<div class="card-body p-0 d-flex align-items-center">
											<div class="bg-danger p-4 mfe-3">
												<svg class="c-icon c-icon-xl">
													<use xlink:href="vendors/@coreui/icons/svg/free.svg#cil-frown"></use>
												</svg>
											</div>
											<div>
												<div class="text-value text-danger"> [{{ total_dead }}] </div>
												<div class="text-muted text-uppercase font-weight-bold small"> Fallecidos </div>
											</div>
										</div>
									</div>
								</div>
								<!-- /.col-->
							</div>	
						</div>
					</div>
				</div>
				<div class="col-sm-12 col-md-6 col-lg-4">
					<div class="card">
						<div class="card-header"> Mapa Geográfico <span class="font-weight-bold"> {{ deparment }} </span>
							<div class="card-header-actions"><a class="card-header-action" href="http://www.chartjs.org" target="_blank"><small class="text-muted">docs</small></a></div>
						  </div>
						<div class="card-body">
							<div class="c-chart-wrapper"">
								<div id="mapid"></div>
							</div>
						</div>
					</div>
				</div>
				<div class="col-sm-12 col-md-12 col-lg-5">
					<div class="row">
						<div class="col-sm-12 col-md-12 col-lg-12">
							<div class="card">
								<div class="card-header"> Evolución de Casos <span class="font-weight-bold"> {{ deparment }} </span>
									<div class="card-header-actions"><a class="card-header-action" href="http://www.chartjs.org" target="_blank"><small class="text-muted">docs</small></a></div>
								  </div>
								<div class="card-body">
									<div class="c-chart-wrapper"">
										<canvas id="main-chart"></canvas>
									</div>
								</div>
							</div>
						</div>
						<div class="col-sm-12 col-md-12 col-lg-12">
							<div class="card">
								<div class="card-header"> Factor de Propagación <span class="font-weight-bold"> {{ deparment }} </span>
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
				deparment_index: 0,
				deparment: "",
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
				let self = this;
				let min_ = 1000000;
				let max_ = 0;

				// get min and max infected
				localData.forEach((item, index) => {
					if (index > 0) {
						let current = [item.latitude, item.longitude];
						let total_infected = 0
						for(let k = 0; k < item.data.length;  k++) {
							total_infected += item.data[k].infected;
						}
						if (total_infected < min_) {
							min_ = total_infected;
						}
						if (total_infected > max_) {
							max_ = total_infected;
						}
					}
				});

				localData.forEach((item, index) => {
					this.deparments.push(item.deparment);

					if (index > 0) {
						let current = [item.latitude, item.longitude];
						let total_infected = 0
						for(let k = 0; k < item.data.length;  k++) {
							total_infected += item.data[k].infected;
						}
						let normalization = 25000 + (((total_infected - min_) / (max_ - min_)) * (50000 - 0) + 0)

						let circle = L.circle(current, normalization, {
							color: '#db3236',
							fillColor: '#db3236',
							fillOpacity: 0.4,
							opacity: 0.8,
							weight: 1,
						})
						.on("click", function (e) {
							self.loadData(e.target.index);
							self.deparment_index = e.target.index;
						})
						.bindTooltip(String(total_infected) , {direction: 'right', permanent: true, offset: [0, 0], className: 'class-tooltip'})
						.addTo(this.map);

						circle.index = index;
					}
				});
			},
			loadData (index) {
				this.deparment = (localData[index].deparment);
				this.latitude = localData[index].latitude;
				this.longitude = localData[index].longitude;

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

				for(let k = 0; k < localData[index].data.length;  k++) {
					this.date.push(localData[index].data[k].date);

					this.total_infected += localData[index].data[k].infected;
					this.infected.push(this.total_infected);

					this.total_discard = localData[0].data[k].discard
					this.discard.push(this.total_discard);

					this.total_healthy += localData[0].data[k].healthy
					if (index == 0) {
						this.healthy.push(this.total_healthy);
					}

					this.total_dead += localData[index].data[k].dead;
					this.dead.push(this.total_dead);

					let f = 0;
					if (k < localData[index].data.length - 1 && this.total_infected != 0) {
						f = (localData[index].data[k].infected + this.total_infected) / this.total_infected;
					}
					this.factor.push(f.toFixed(2));
				}
				// this.F.shift();
				const arraySum = array => array.reduce((a, b) => a + b, 0)
				this.factor[0] = 0;

				this.updateData(this.lineChart, this.date, [this.infected, this.dead]);
				this.updateData(this.barChart, this.date, [this.factor]);

				let lat_lon = L.latLng(this.latitude, this.longitude);
				this.marker.setLatLng(lat_lon);
				this.marker.bindPopup(this.deparment);
				this.map.panTo([this.latitude, this.longitude]);
			},
			createLine () {
				this.lineChart = new Chart(document.getElementById('main-chart'), {
					type: 'line',
					data: {
						labels: [],
						datasets: [ /*{
							label: 'Recuperados',
							backgroundColor: 'rgba(220, 220, 220, 0.2)',
							borderColor: 'rgba(46, 184, 92, 1)',
							pointBackgroundColor: 'rgba(46, 184, 92, 1)',
							pointBorderColor: '#fff',
							data: []
						}, */ {
							label: 'Confirmados',
							backgroundColor: 'rgba(220, 220, 220, 0.2)',
							borderColor: 'rgba(249, 177, 21, 1)',
							pointBackgroundColor: 'rgba(249, 177, 21, 1)',
							pointBorderColor: '#fff',
							data: []
						} /* , {
							label: 'Descartados',
							backgroundColor: 'rgba(151, 187, 205, 0.2)',
							borderColor: 'rgba(1, 153, 255, 1)',
							pointBackgroundColor: 'rgba(1, 153, 255, 1)',
							pointBorderColor: '#fff',
						  data: this.discard
						}, {
							label: 'Fallecidos',
							backgroundColor: 'rgba(220, 220, 220, 0.2)',
							borderColor: 'rgba(229, 83, 83, 1)',
							pointBackgroundColor: 'rgba(229, 83, 83, 1)',
							pointBorderColor: '#fff',
							data: []
						} */]
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
							backgroundColor: 'rgba(46, 184, 92, 0.75)',
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
				})
				.bindPopup("Perú", {direction: 'top', permanent: false, offset: [0, 0], className: 'class-popup'})
				.addTo(this.map);
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
