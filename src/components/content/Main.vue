<template>
    <div class="container">
        <div class="row">
            <div class="col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3 col-xs-8 col-xs-offset-2 segment-label">
                twoje notatki
            </div>
        </div>
        <div class="btn-group expand-menu">
            <button type="button" class="btn btn-link dropdown-toggle menu-icon" data-toggle="dropdown"></button>
            <ul class="dropdown-menu dropdown-menu-right" role="menu">
                <li><button class="btn btn-link" data-toggle="modal" data-target="#createNotebook">stwórz notatnik</button></li>
            </ul>
        </div>
        <div class="row note-list-content">
            <div class="col-md-12 col-md-offset-0 col-xs-10 col-xs-offset-1">
                <ul v-if="notebooks.length > 0" class="list-unstyled list-inline">
                    <li v-bind:data-id="notebook.id" v-for="notebook in this.notebooks" class="col-md-3 col-sm-3 col-xs-12">
                        <router-link :to="{ name: 'Notebook', params: { id: notebook.id }}">{{ notebook.name }}</router-link>
                    </li>
                </ul>
                <div v-else class="empty-notebooks">
                    <h3>nie stworzyłeś jeszcze żadnego notatnika</h3>
                    <h4>...</h4>
                    <button class="btn btn-link" data-toggle="modal" data-target="#createNotebook">stwórz notatnik</button>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3 col-xs-8 col-xs-offset-2 segment-label">
                obserwowane
            </div>
        </div>
        <create-notebook-modal></create-notebook-modal>
    </div>
</template>
<script>
    import CreateNotebookModal from '@/components/modals/CreateNotebook'

    export default {
        name: 'Main',
        data() {
            return {
                notebooks: []
            }
        },
        methods: {
            getNotebooks() {
                this.$http.get('notebooks').then(response => {
                    if (response.body.success) {
                        if (response.body.notebooks.length > 0) {
                            this.notebooks = response.body.notebooks;
                        }
                    }
                }, response => {
                    alert('Wystąpił błąd.');
                });
            }
        },
        components: {
            CreateNotebookModal
        },
        beforeMount() {
            this.getNotebooks();
        }
    }
</script>
<style src="../../css/home/logged-in/main.css" scoped></style>