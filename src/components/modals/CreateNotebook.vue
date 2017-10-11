<template>
    <div class="modal fade" id="createNotebook" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Zamknij</span></button>
                    <h3 class="modal-title" id="modalLabel">Stwórz notatnik</h3>
                </div>
                <div class="modal-body">
                    <form class="form create-notebook" @submit.prevent="createNotebook" id="notebookForm" role="form">
                        <div class="row">
                            <div class="form-group col-md-10 col-md-offset-1">
                                <input
                                        type="text"
                                        name="name"
                                        v-validate="'min:3|max:50'"
                                        data-vv-as="nazwa"
                                        class="form-control"
                                        placeholder="Nazwa"
                                        v-model="form.name"
                                        :class="{'form-control-error': errors.has('name') }">
                                <span class="pre-error" v-show="errors.has('name')">{{ errors.first('name') }}</span>
                            </div>
                            <div class="form-group col-md-10 col-md-offset-1 col-sm-10 col-sm-offset-1 notebook-privacy">
                                <div class="control-group">
                                    <label class="control control-radio radio-inline">
                                        Publiczny
                                        <input type="radio" value="false" name="privacy" v-model="form.private">
                                        <div class="control_indicator"></div>
                                    </label>
                                    <label class="control control-radio radio-inline">
                                        Prywatny
                                        <input type="radio" value="true" name="privacy" v-model="form.private">
                                        <div class="control_indicator"></div>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="post-errors">
                            <ul class="list-unstyled">
                                <li v-for="error in errorList">{{ error }}</li>
                            </ul>
                        </div>
                        <div class="row">
                            <div class="col-md-6 col-md-offset-3">
                                <button type="submit" class="btn">Utwórz</button>
                            </div>
                        </div>
                    </form>
                </div> <!-- .modal-body -->
            </div> <!-- .modal-content -->
        </div> <!-- .modal-dialog -->
    </div> <!-- .modal -->
</template>
<script>
    export default {
        data() {
            return {
                form: {
                    name: '',
                    private: 'true'
                },
                errorList: []
            }
        },
        methods: {
            createNotebook() {
                this.$http.post('notebooks', {
                    notebook: this.form
                }).then(response => {
                    if (response.body.success) {
                        this.$store.state.notebooks.unshift(response.body.notebook[0]);
                        $('.modal').modal('hide');
                        $('#notebookForm')[0].reset();
                    } else {
                        this.errorList = response.body.errors;
                    }
                }, response => {
                    alert('Wystąpił błąd');
                });
            }
        }
    }
</script>
<style src="../../css/modals/create-notebook.css" scoped></style>