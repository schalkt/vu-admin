<template>
  <div class="container-fluid mt-5">
    <div class="row">
      <div class="col-md-12">
        <vu-admin :entity="'products'" />
      </div>
      <div class="col-md-12">
        <vu-admin :entity="'users'" />
      </div>
    </div>
  </div>
</template>
  
<script>
import VuAdmin from "./src/components/VuAdmin.vue";

VuAdmin.init({
  translate: {
    hu: {
      Columns: "Oszlopok",
      all: "összesen",
      page: "oldal",
      row: "sor",
      hidden: "rejtett",
      "Visible all": "Mind látható",
      "Hidden all": "Mind rejtett",
      First: "Első",
      Next: "Következő",
      Prev: "Előző",
      Last: "Utolsó",
      Reload: "Újratöltés",
      New: "Új",
      Copy: "Másolás",
      Delete: "Törlés",
      Close: "Bezár",
      Save: "Mentés",
      "Save and close": "Ment és bezár",
      // '=': 'Egyenlő',
      // '>': 'Nagyobb',
      // '>=': 'Nagyobb vagy egyenlő',
      // '<': 'Kisebb',
      // '<=': 'Kisebb vagy egyenlő',
      "Are you sure you want to delete all selected items?":
        "Biztos hogy törölni akarod az összes kiválasztott elemet?",
    },
  },
  entities: window.VuEntities,
});

export default {
  components: {
    VuAdmin,
  },
};
</script>
  