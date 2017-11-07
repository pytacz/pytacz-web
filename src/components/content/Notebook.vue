<template>
    <div class="notebook-container">
        <div v-if="!forbidden">
            <div v-if="loading">
                <div class="loader-container">
                    <div class="loader"></div>
                </div>
            </div>
            <div v-else>
                <div class="row notebook-header">
                    <h2>{{ notebook.name }}</h2>
                </div>
                <div class="row notebook-label">
                    <span class="author">użytkownika <a href="#"><strong>{{ owner }}</strong></a></span>
                </div>

                <!--note addition-->
                <div v-if="$auth.user().username == owner" class="row notebook-settings">
                    <button class="btn-xs" data-toggle="modal" data-target="#notebookSettings">zarządzaj</button>
                </div>
                <div v-show="$auth.user().username == owner" class="row">
                    <button @click="expandNoteAddition" class="btn btn-link">+ dodaj</button>
                    <button @click="redirectToQuestion" class="btn btn-link">przepytaj</button>
                    <div class="note-addition col-md-12">
                        <form class="form note-addition-form" @submit.prevent="createNote" role="form">
                            <div class="row">
                                <div class="col-md-4 col-sm-4 col-xs-12">
                                    <input
                                            type="text"
                                            class="col-md-12 col-sm-12 col-xs-12"
                                            name="name"
                                            v-validate="'max:50'"
                                            data-vv-as="pojęcie"
                                            v-model="addNote.form.name"
                                            :class="{'form-control-error': errors.has('name') }"
                                            placeholder="pojęcie">
                                        <div><input type="checkbox" v-model="addNote.form.askable"> Przepytuj</div>
                                </div>
                                <textarea
                                        class="edit-note-content col-md-8 col-sm-8 col-xs-12"
                                        name="content"
                                        v-validate="'max:1000'"
                                        data-vv-as="treść"
                                        v-model="addNote.form.content"
                                        rows="2"
                                        :class="{'form-control-error': errors.has('content') }"
                                        data-autoresize
                                        placeholder="treść"></textarea>
                                <div class="col-md-5 col-sm-5 col-xs-8">
                                    <span class="pre-error" v-show="errors.has('content') || errors.has('name')">
                                        {{ errors.first('content') }}
                                        {{ errors.first('name') }}
                                    </span>
                                </div>
                                <div class="remaining-characters col-md-3 col-sm-3 col-xs-4">Pozostałe znaki: {{ addNoteCharactersLeft }}</div>
                                <div class="col-md-12">
                                    <button type="submit" class="btn btn-default btn-xs add-note-button col-md-3 col-md-offset-9 col-xs-10 col-xs-offset-1">zapisz</button>
                                </div>
                            </div>
                        </form> <!--.note-addition-form-->
                        <div class="post-errors">
                            <ul class="list-unstyled">
                                <li v-for="error in addNote.errors">{{ error }}</li>
                            </ul>
                        </div>
                    </div>
                </div> <!--.row-->

                <!--notes list-->
                <div class="container-fluid">
                    <div class="row">
                        <div v-if="notes.length > 0">
                            <ul class="notes-list list-unstyled">
                                <li v-for="note in notes" class="note col-md-12">
                                    <div class="row">
                                        <div :data-id="note.id" class="col-md-12 note-container">
                                            <div class="row">
                                                <div class="col-md-3 col-sm-3 note-name">
                                                    <div class="name-field">
                                                        <strong>{{ note.name }}</strong>
                                                    </div>
                                                    <div class="dash hidden-xs visible-sm visible-md visible-lg">-</div>
                                                </div>
                                                <div class="col-md-9 col-sm-9 note-content">
                                                    {{ note.content }}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-show="$auth.user().username == owner">
                                        <button @click="expandEditNote($event, note.id)" class="btn btn-link btn-xs display-edition">
                                            <img src="../../assets/icons/pencil.svg" class="display-edition-icon">
                                        </button>
                                        <button @click="deleteNote($event, note.id)" class="btn btn-link btn-xs delete-note">
                                            <img src="../../assets/icons/trashcan.svg" class="delete-note-icon">
                                        </button>
                                        <button @click="expandSubNoteAddition($event)" class="btn btn-link btn-xs display-sub-note-addition">
                                            <img src="../../assets/icons/plus.svg" class="add-sub-note-icon">
                                        </button>

                                        <!--note edition-->
                                        <div class="note-edition row">
                                            <div class="post-errors col-md-12">
                                                <ul class="list-unstyled">
                                                    <li v-for="error in editNote.errors">{{ error }}</li>
                                                </ul>
                                            </div>
                                            <form class="form note-edition-form" @submit.prevent="patchNote($event, note.id)" role="form">
                                                <div class="col-md-4 col-sm-4 col-xs-12">
                                                    <input
                                                            type="text"
                                                            class="col-md-12 col-sm-12 col-xs-12"
                                                            name="editName"
                                                            v-validate="'max:50'"
                                                            data-vv-as="pojęcie"
                                                            v-model="editNote.form.name"
                                                            :class="{'form-control-error': errors.has('editName') }"
                                                            placeholder="pojęcie">
                                                    <div><input type="checkbox" v-model="editNote.form.askable"> Przepytuj</div>
                                                </div>
                                                <textarea
                                                        class="edit-note-content col-md-8 col-sm-8 col-xs-12"
                                                        name="content"
                                                        v-validate="'max:1000'"
                                                        data-vv-as="treść"
                                                        v-model="editNote.form.content"
                                                        rows="3"
                                                        :class="{'form-control-error': errors.has('content') }"
                                                        data-autoresize
                                                        placeholder="treść"></textarea>
                                                <div class="col-md-5 col-sm-5 col-xs-8">
                                                    <span class="pre-error" v-show="errors.has('content') || errors.has('editName')">
                                                        {{ errors.first('content') }}
                                                        {{ errors.first('editName') }}
                                                    </span>
                                                </div>
                                                <div class="remaining-characters col-md-3 col-sm-3 col-xs-4">Pozostałe znaki: {{ editNoteCharactersLeft }}</div>
                                                <div class="col-md-12">
                                                    <button type="submit" class="btn btn-default btn-xs col-md-3 col-md-offset-9 col-xs-10 col-xs-offset-1">zapisz</button>
                                                </div>
                                            </form>
                                        </div>

                                        <!--subnote addition-->
                                        <div class="sub-note-addition row">
                                            <div class="post-errors row">
                                                <ul class="list-unstyled col-md-11 col-md-offset-1 col-sm-11 col-sm-offset-1 col-xs-11 col-xs-offset-1">
                                                    <li v-for="error in addSubNote.errors">{{ error }}</li>
                                                </ul>
                                            </div>
                                            <form class="form sub-note-addition-form" @submit.prevent="createSubNote($event, note.id)" role="form">
                                                <div class="col-md-4 col-md-offset-1 col-sm-4 col-sm-offset-1 col-xs-11 col-xs-offset-1">
                                                    <div class="bullet-point"></div>
                                                    <input
                                                            type="text"
                                                            class="col-md-12 col-sm-12 col-xs-12"
                                                            name="addSubNoteName"
                                                            v-validate="'max:50'"
                                                            data-vv-as="pojęcie"
                                                            v-model="addSubNote.form.name"
                                                            :class="{'form-control-error': errors.has('addSubNoteName') }"
                                                            placeholder="pojęcie">
                                                    <div><input type="checkbox" v-model="addSubNote.form.askable"> Przepytuj</div>
                                                </div>
                                                <textarea
                                                        class="edit-note-content col-md-7 col-sm-7 col-xs-11 col-xs-offset-1"
                                                        name="addSubNoteContent"
                                                        v-validate="'max:1000'"
                                                        data-vv-as="treść"
                                                        v-model="addSubNote.form.content"
                                                        rows="2"
                                                        :class="{'form-control-error': errors.has('addSubNoteContent') }"
                                                        data-autoresize
                                                        placeholder="treść"></textarea>
                                                <div class="col-md-4 col-sm-5 col-xs-8">
                                                    <span class="pre-error" v-show="errors.has('addSubNoteContent') || errors.has('addSubNoteName')">
                                                        {{ errors.first('addSubNoteContent') }}
                                                        {{ errors.first('addSubNoteName') }}
                                                    </span>
                                                </div>
                                                <div class="remaining-characters col-md-3 col-sm-3 col-xs-4">Pozostałe znaki: {{ addSubNoteCharactersLeft }}</div>
                                                <div class="col-md-12">
                                                    <button type="submit" class="btn btn-default btn-xs add-note-button col-md-3 col-md-offset-9 col-xs-10 col-xs-offset-1">zapisz</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>

                                    <!--subnotes list-->
                                    <div class="row">
                                        <ul class="sub-notes-list list-unstyled">
                                            <li v-for="subNote in note.subNotes" class="sub-note">

                                                <div class="row">
                                                    <div :data-id="subNote.id" class="sub-note-container">
                                                        <div class=" col-md-3 col-md-offset-1 col-sm-3 col-sm-offset-1 col-xs-10 col-xs-offset-1 note-name">
                                                            <div class="bullet-point"></div>
                                                            <div class="name-field">
                                                                <strong>{{ subNote.name }}</strong>
                                                            </div>
                                                            <div class="dash hidden-xs visible-sm visible-md visible-lg">-</div>
                                                        </div>
                                                        <div class="col-md-7 col-md-offset-0 col-sm-7 col-sm-offset-0 col-xs-11 col-xs-offset-1 note-content">
                                                            {{ subNote.content }}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div v-show="$auth.user().username == owner">
                                                    <button @click="expandEditSubNote($event, note.id, subNote.id)" class="btn btn-link btn-xs display-sub-note-edition">
                                                        <img src="../../assets/icons/pencil.svg" class="display-sub-note-edition-icon">
                                                    </button>
                                                    <button @click="deleteSubNote(note.id, subNote.id)" class="btn btn-link btn-xs delete-sub-note">
                                                        <img src="../../assets/icons/trashcan.svg" class="delete-sub-note-icon">
                                                    </button>

                                                    <!--subnote edition-->
                                                    <div class="sub-note-edition">
                                                        <div class="post-errors row">
                                                            <ul class="list-unstyled col-md-11 col-md-offset-1 col-sm-11 col-sm-offset-1 col-xs-11 col-xs-offset-1">
                                                                <li v-for="error in editSubNote.errors">{{ error }}</li>
                                                            </ul>
                                                        </div>
                                                        <div class="row">
                                                            <form class="form sub-note-edition-form" @submit.prevent="patchSubNote($event, note.id, subNote.id)" role="form">
                                                                <div class="col-md-4 col-sm-4 col-xs-11 col-xs-offset-1">
                                                                    <div class="bullet-point"></div>
                                                                    <input
                                                                            type="text"
                                                                            class="col-md-12 col-sm-12 col-xs-12"
                                                                            name="editSubNoteName"
                                                                            v-validate="'max:50'"
                                                                            data-vv-as="pojęcie"
                                                                            v-model="editSubNote.form.name"
                                                                            :class="{'form-control-error': errors.has('editSubNoteName') }"
                                                                            placeholder="pojęcie">
                                                                    <div><input type="checkbox" v-model="editSubNote.form.askable"> Przepytuj</div>
                                                                </div>
                                                                <textarea
                                                                        class="edit-note-content col-md-7 col-sm-7 col-xs-11 col-xs-offset-1"
                                                                        name="editSubNoteContent"
                                                                        v-validate="'max:1000'"
                                                                        data-vv-as="treść"
                                                                        v-model="editSubNote.form.content"
                                                                        rows="2"
                                                                        :class="{'form-control-error': errors.has('editSubNoteContent') }"
                                                                        data-autoresize
                                                                        placeholder="treść"></textarea>
                                                                <div class="col-md-4 col-sm-5 col-xs-8">
                                                                            <span class="pre-error" v-show="errors.has('editSubNoteContent') || errors.has('editSubNoteName')">
                                                                                {{ errors.first('editSubNoteContent') }}
                                                                                {{ errors.first('editSubNoteName') }}
                                                                            </span>
                                                                </div>
                                                                <div class="remaining-characters col-md-3 col-sm-3 col-xs-4">Pozostałe znaki: {{ editSubNoteCharactersLeft }}</div>
                                                                <div class="col-md-12">
                                                                    <button type="submit" class="btn btn-default btn-xs add-note-button col-md-3 col-md-offset-9 col-xs-10 col-xs-offset-1">
                                                                        zapisz
                                                                    </button>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </div> <!--.sub-note-edition-->
                                                </div>
                                            </li> <!--.sub-note-->
                                        </ul> <!--.sub-notes-list-->
                                    </div> <!--.row-->
                                </li> <!--.note-->
                            </ul> <!--.notes-list-->
                        </div>
                        <div v-cloak class="notes-empty" v-else>
                            <div class="message col-md-10 col-md-offset-1">
                                <div style="margin-top: 20px;">
                                    <h2>ten notatnik jest pusty</h2>
                                    <h3>...</h3>
                                </div>
                            </div>
                        </div>
                    </div> <!--.row-->
                </div> <!--.container-fluid-->
            </div>
        </div>
        <div v-cloak v-else>
            <div class="sad-face">:(</div>
            <div class="message">
                <h2>ten notatnik jest prywatny</h2>
                <h3>...</h3>
            </div>
        </div>
        <notebook-settings-modal></notebook-settings-modal>
    </div> <!--.notebook-container-->
</template>
<script>
    import NotebookSettingsModal from '@/components/modals/NotebookSettings'

    export default {
        data() {
            return {
                owner: '',
                forbidden: false,
                startPoint: '',
                notes: [],
                load: true,
                addNote: {
                    form: {
                        name: '',
                        content: '',
                        askable: true
                    },
                    errors: []
                },
                addSubNote: {
                    form: {
                        name: '',
                        content: '',
                        askable: true
                    },
                    errors: []
                },
                editNote: {
                    form: {
                        name: '',
                        content: '',
                        askable: ''
                    },
                    errors: []
                },
                editSubNote: {
                    form: {
                        name: '',
                        content: '',
                        askable: ''
                    },
                    errors: []
                },
                limit: 1000,
                loading: true
            }
        },
        computed: {
            notebook() {
                return this.$store.state.notebook;
            },
            addNoteCharactersLeft() {
                var chars = this.addNote.form.content.length;

                return this.limit - chars;
            },
            editNoteCharactersLeft() {
                var chars = this.editNote.form.content.length

                return this.limit - chars;
            },
            addSubNoteCharactersLeft() {
                var chars = this.addSubNote.form.content.length;

                return this.limit - chars;
            },
            editSubNoteCharactersLeft() {
                var chars = this.editSubNote.form.content.length

                return this.limit - chars;
            }
        },
        methods: {
            getNotebook() {
                this.$http.get('notebooks/' + this.$route.params.id).then(response => {
                    if (response.body.success) {
                        this.$store.state.notebook = response.body.notebook[0];
                        this.owner = response.body.user;
                    } else {
                        this.notebooks = null;
                    }
                }, response => {
                    if (response.status === 403) {
                        this.forbidden = true;
                    } else if (response.status === 404) {
                        this.$router.push({ name: '404' });
                    }
                });
            },
            expandNoteAddition() {
                $('.note-addition').toggle();
            },
            expandSubNoteAddition(event) {
                $(event.target).closest('li').find('.sub-note-addition').toggle();
            },
            createNote() {
                this.addNote.form.id_notebook = this.notebook.id;
                this.$http.post('notes', {
                    note: this.addNote.form
                }).then(response => {
                    if (response.body.success) {
                        this.notes.unshift(response.body.note[0]);
                    } else {
                        this.addNote.errors = response.body.errors;
                    }
                    $('.note-addition').hide();
                    this.addNote.form = {
                        name: '',
                        content: '',
                        askable: true
                    }
                }, response => {
                    alert('Wystąpił błąd');
                });
            },
            getNotes() {
                this.$http.get('notebooks/' + this.$route.params.id + '/notes', {
                    params: {
                        start_point: this.startPoint
                    }
                }).then(response => {
                    if (response.body.success) {
                        if (response.body.notes.length > 0) {
                            response.body.notes.forEach(note => {
                                this.notes.push(note);
                            });
                        }

                        this.startPoint = response.body.start_point;
                        if (this.startPoint === null) {
                            this.load = false;
                        } else {
                            this.load = true;
                        }
                        this.loading = false;
                    }
                }, response => {
                    alert('Wystąpił błąd');
                });
            },
            expandEditNote(event, id) {
                var note = this.notes.filter(function(note){
                    return note.id === id;
                });
                if (note) {
                    this.editNote.form.name = note[0].name;
                    this.editNote.form.content = note[0].content;
                    this.editNote.form.askable = note[0].askable;
                    var $textarea = $('textarea');
                    $textarea.on('focus', function () {
                        autosize($textarea);
                    });

                    var $thisNoteContainer = $(event.target).closest('li').find('.note-container'),
                        $thisNoteEdition = $(event.target).closest('li').find('.note-edition');
                    $('.note-container').not($thisNoteContainer).show();
                    $('.note-edition').not($thisNoteEdition).hide();
                    $thisNoteContainer.toggle();
                    $thisNoteEdition.toggle();
                }
            },
            patchNote(event, id) {
                this.$http.patch('notes/' + id, {
                    note: this.editNote.form
                }).then(response => {
                    if (response.body.success) {
                        var result = response.body.result;

                        var notes = this.notes;
                        for (var i in this.notes) {
                            if (notes[i].id === id) {
                                notes[i].name = result.name;
                                notes[i].content = result.content;
                                notes[i].askable = result.askable;
                            }
                        }
                        $(event.target).closest('li').find('.note-edition').hide();
                        $(event.target).closest('li').find('.note-container').show();

                    } else {
                        this.editNote.errors = response.body.errors;
                    }
                }, response => {
                    alert('Wystąpił błąd');
                });
            },
            deleteNote(event, id) {
                this.$http.delete('notes/' + id).then(response => {
                    if (response.body.success) {
                        this.notes = this.notes.filter(function(note){
                            return note.id !== id;
                        });
                        $(event.target).closest('li').find('.note-edition').hide();
                        $(event.target).closest('li').find('.note-container').show();
                    } else {
                        alert('Wystąpił błąd');
                    }
                }, response => {
                    alert('Wystąpił błąd');
                });
            },
            createSubNote(event, id) {
                this.addSubNote.form.id_note = id;
                this.$http.post('subnotes', {
                    sub_note: this.addSubNote.form
                }).then(response => {
                    if (response.body.success) {
                        for (var i in this.notes) {
                            if (this.notes[i].id === id) {
                                this.notes[i].subNotes.push(response.body.sub_note[0]);
                            }
                        }
                        $(event.target).closest('li').find('.sub-note-addition').hide();
                        this.addSubNote.form = {
                            name: '',
                            content: '',
                            askable: true
                        };
                    } else {
                        this.addSubNote.errors = response.body.errors;
                    }
                }, response => {
                    alert('Wystąpił błąd');
                });
            },
            expandEditSubNote(event, idNote, idSubNote) {
                var note = this.notes.filter(function(note){
                        return note.id === idNote;
                    }),
                    subNote = note[0].subNotes.filter(function(subNote){
                        return subNote.id === idSubNote;
                    });
                if (subNote) {
                    this.editSubNote.form.name = subNote[0].name;
                    this.editSubNote.form.content = subNote[0].content;
                    this.editSubNote.form.askable = subNote[0].askable;
                    var $textarea = $('textarea');
                    $textarea.on('focus', function () {
                        autosize($textarea);
                    });

                    var $thisNoteContainer = $(event.target).closest('li').find('.sub-note-container'),
                        $thisNoteEdition = $(event.target).closest('li').find('.sub-note-edition');
                    $('.sub-note-container').not($thisNoteContainer).show();
                    $('.sub-note-edition').not($thisNoteEdition).hide();
                    $thisNoteContainer.toggle();
                    $thisNoteEdition.toggle();
                }
            },
            patchSubNote(event, idNote, idSubNote) {
                this.$http.patch('subnotes/' + idSubNote, {
                    sub_note: this.editSubNote.form
                }).then(response => {
                    if (response.body.success) {
                        var result = response.body.result;
                        var notes = this.notes;
                        for (var i in this.notes) {
                            if (this.notes[i].id === idNote) {
                                for (var j in this.notes[i].subNotes) {
                                    if (notes[i].subNotes[j].id === idSubNote) {
                                        notes[i].subNotes[j].name = result.name;
                                        notes[i].subNotes[j].content = result.content;
                                        notes[i].subNotes[j].askable = result.askable;
                                    }
                                }
                            }
                        }
                        $(event.target).closest('li').find('.sub-note-edition').hide();
                        $(event.target).closest('li').find('.sub-note-container').show();

                    } else {
                        this.editSubNote.errors = response.body.errors;
                    }
                }, response => {
                    alert('Wystąpił błąd');
                });
            },
            deleteSubNote(idNote, idSubNote) {
                this.$http.delete('subnotes/' + idSubNote).then(response => {
                    if (response.body.success) {
                        for (var i in this.notes) {
                            if (this.notes[i].id === idNote) {
                                for (var j in this.notes[i].subNotes) {
                                    if (this.notes[i].subNotes[j].id === idSubNote) {
                                        this.notes[i].subNotes.splice(j, 1);
                                    }
                                }
                            }
                        }
                    } else {
                        alert('Wystąpił błąd');
                    }
                }, response => {
                    alert('Wystąpił błąd');
                });
            },
            redirectToQuestion() {
                localStorage.setItem('notebooks', JSON.stringify([this.$route.params.id]));
                this.$router.push({name: 'Question', params: {id: this.$route.params.id}});
            }
        },
        beforeMount() {
            this.getNotebook();
            this.getNotes();
        },
        mounted() {
            autosize($('textarea'));
            var that = this;
            $(window).scroll(function() {
                if(that.load && ($(window).scrollTop() > $(document).height() - $(window).height() - 100)) {
                    that.load = false;
                    that.getNotes();
                }
            });
        },
        components: {
            NotebookSettingsModal
        },
    }
</script>
<style src="../../css/notebook/scheme.css" scoped></style>
<style src="../../css/notebook/notes.css" scoped></style>
<style src="../../css/notebook/icons.css" scoped></style>
<style src="../../css/notebook/list.css" scoped></style>