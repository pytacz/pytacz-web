<template>
    <div class="modal fade" id="notebookSettings" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Zamknij</span></button>
                    <h3 class="modal-title" id="modalLabel">Zarządzaj notatnikiem</h3>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="post-errors col-md-12">
                            <ul class="list-unstyled">
                                <li v-for="error in errorList">{{ error }}</li>
                            </ul>
                        </div>
                    </div>
                    <form class="form notebook-name" @submit.prevent="changeName" id="notebookName" role="form">
                        <div class="row form-label">
                            <p>Nazwa</p>
                        </div>
                        <div class="row">
                            <div class="form-group">
                                <div class="col-md-9 col-sm-9 col-xs-8">
                                    <input
                                            type="text"
                                            name="name"
                                            v-validate="'min:3|max:50'"
                                            data-vv-as="nazwa"
                                            v-model="name"
                                            class="form-control"
                                            :class="{'form-control-error': errors.has('name') }">
                                </div>
                                <div class="col-md-3 col-sm-3 col-xs-4">
                                    <button type="submit" class="btn col-md-12 col-sm-12 col-xs-12">Zmień</button>
                                </div>
                                <span class="pre-error col-md-12" v-show="errors.has('name')">{{ errors.first('name') }}</span>
                            </div>
                        </div>
                    </form>
                    <hr>
                    <form class="form notebook-privacy" @submit.prevent="changePrivacy" id="notebookPrivacy" role="form">
                        <div class="row form-label">
                            <p>Prywatność</p>
                        </div>
                        <div class="row">
                            <div class="form-group">
                                <div class="col-md-5 col-sm-5 col-xs-5">
                                    <div class="control-group">
                                        <label class="control control-radio radio-inline">
                                            Publiczny
                                            <input type="radio" value="false" name="privacy" v-model="private">
                                            <div class="control_indicator"></div>
                                        </label>
                                        <label class="control control-radio radio-inline">
                                            Prywatny
                                            <input type="radio" value="true" name="privacy" v-model="private">
                                            <div class="control_indicator"></div>
                                        </label>
                                    </div>
                                </div>
                                <div class="col-md-5 col-sm-5 col-sm-offset-2 col-xs-5 col-xs-offset-2">
                                    <button type="submit" class="btn col-md-12 col-sm-12 col-xs-12">Zmień</button>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div class="notebook-delete">
                        <div class="row form-label">
                            <p>Usuń notatnik</p>
                        </div>
                        <div class="row">
                            <div class="col-md-3 col-md-offset-9 col-sm-3 col-sm-offset-9 col-xs-4 col-xs-offset-8">
                                <button type="button" class="btn col-md-12 col-sm-12 col-xs-12" @click="toggleConfirmation">Usuń</button>
                            </div>
                            <div class="delete-confirmation">
                                <h4>Czy na pewno chcesz usunąć ten notatnik?</h4>
                                <button type="button" class="btn" @click="deleteNotebook">Tak</button>
                                <button type="button" class="btn" @click="toggleConfirmation">Nie</button>
                            </div>
                        </div>
                    </div>
                </div> <!-- .modal-body -->
            </div> <!-- .modal-content -->
        </div> <!-- .modal-dialog -->
    </div> <!-- .modal -->
</template>
<script>
    export default {
        data() {
            return {
                name: '',
                private: '',
                errorList: []
            }
        },
        methods: {
            changeName() {
                this.$http.patch('notebooks/' + this.$parent.notebook.id, {
                    notebook: {
                        name: this.name
                    }
                }).then(response => {
                    if (response.body.success) {
                        this.$store.state.notebook.name = response.body.result.name;
                        $('.modal').modal('hide');
                    } else {
                        this.errorList = response.body.errors;
                    }
                }, response => {
                    alert('Wystąpił błąd');
                });
            },
            changePrivacy() {
                this.$http.patch('notebooks/' + this.$store.state.notebook.id, {
                    notebook: {
                        private: this.private
                    }
                }).then(response => {
                    if (response.body.success) {
                        this.$store.state.notebook.private = response.body.result.private;
                        $('.modal').modal('hide');
                    } else {
                        this.errorList = response.body.errors;
                    }
                }, response => {
                    alert('Wystąpił błąd');
                });
            },
            toggleConfirmation() {
                $('.delete-confirmation').slideToggle();
            },
            deleteNotebook() {
                this.$http.delete('notebooks/' + this.$store.state.notebook.id).then(response => {
                    if (response.body.success) {
                        $('.modal').modal('hide');
                        this.$router.push({ name: 'Main' });
                    } else {
                        this.errorList = response.body.errors;
                    }
                }, response => {
                    alert('Wystąpił błąd');
                });
            }
        },
        mounted: function() {
            const that = this;
            $('#notebookSettings').on('shown.bs.modal', function() {
                that.name = that.$store.state.notebook.name;
                that.private = that.$store.state.notebook.private;
            });
        }
    }
</script>
<style src="../../css/modals/notebook-settings.css" scoped></style>