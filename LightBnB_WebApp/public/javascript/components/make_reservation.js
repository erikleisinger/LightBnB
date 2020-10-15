$(() => {

  const $makeReservation = $(`
  <form action="/properties" method="post" id="search-property-form" class="search-property-form">
      <div class="search-property-form__field-wrapper">
        <label for="search-property-form__city">City</label>
        <input type="text" name="property_id" placeholder="ID" id="search-property-form__city">
      </div>

      <div class="search-property-form__field-wrapper">
        <label for="search-property-form__minimum-price-per-night">Minimum Cost</label>
        <input type="date" name="start_date" placeholder="Start Date" id="search-property-form__minimum-price-per-night">
        <label for="search-property-form__maximum-price-per-night">Maximum Cost</label>
        <input type="date" name="end_date" placeholder="End Date" id="search-property-form__maximum-price-per-night">
      </div>

      <div class="search-property-form__field-wrapper">
          <button>Search</button>
          <a id="search-property-form__cancel" href="#">Cancel</a>
      </div>
    </form>
  
  
  `)

  window.$makeReservation = $makeReservation;

  $makeReservation.on('submit', function(event) {
    event.preventDefault();
    const data = $(this).serialize();
    makeReservation(data).then((res) => {
      console.log(`this is the response: ${JSON.stringify(res, null, 2)}`)
      console.log(res[0].guest_id)

      propertyListings.clearListings();

      return getAllReservations(res[0].guest_id)
    }).then(function(json) {
      propertyListings.addProperties(json.reservations, true);
      views_manager.show('listings_redirect');
    })
    .catch(error => console.error(error));
  })

});