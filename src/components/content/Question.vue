<template>
    <div class="container">
        <div class="row instructions">
            <div class="col-md-12">
                <h3>Uzupełnij pola podając
                <span v-if="reverse === false">
                    treść pojęcia
                </span>
                <span v-else>
                    nazwę dla treści pojęcia
                </span></h3>
            </div>
        </div>
        <div class="row">
            <div class="reverse">
                <label class="control control-checkbox">
                    Odwróć
                    <input type="checkbox" v-model="reverseNext">
                    <div class="control_indicator"></div>
                </label>
            </div>
        </div>
        <div class="container-fluid answers-container">
            <div class="row answers">
                <form class="form" @submit.prevent="submitAnswer" role="form">
                    <div class="row">
                        <div v-if="answered && reverse">
                            <div class="col-xs-12 col-sm-3 col-md-3">
                                <div class="name-field"
                                     :class="{'correct-answer': question.correctAnswer == question.answer,
                                        'incorrect-answer': question.correctAnswer != question.answer}">
                                    <strong>{{ question.answer }}</strong>
                                </div>
                                <div v-if="question.correctAnswer != question.answer">
                                    <div class="correct-answer">
                                        <strong>{{ question.correctAnswer }}</strong>
                                    </div>
                                </div>
                                <div class="dash">-</div>
                            </div>
                        </div>
                        <div v-else>
                            <div class="col-xs-12 col-sm-3 col-md-3">
                                <div v-if="reverse">
                                    <input type="text"
                                        class="col-xs-12 col-sm-12 col-md-12 answer"
                                        v-model="form.answer"
                                        @input="$set(question, 'answer', $event.target.value)"
                                        placeholder="odpowiedź">
                                </div>
                                <div v-else>
                                    <div class="name-field">
                                        <strong>{{ question.name }}</strong>
                                    </div>
                                </div>
                                <div class="dash">-</div>
                            </div>
                        </div>

                        <div v-if="answered && !reverse">
                            <div class="col-xs-12 col-sm-9 col-md-9">
                                <div :class="{'correct-answer': question.correctAnswer == question.answer,
                                        'incorrect-answer': question.correctAnswer != question.answer}">
                                    {{ question.answer }}
                                </div>
                                <div v-if="question.correctAnswer != question.answer">
                                    <div class="correct-answer">
                                        {{ question.correctAnswer }}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-else>
                            <div v-if="reverse" class="col-xs-12 col-sm-9 col-md-9">
                                {{ question.content }}
                            </div>
                            <div v-else>
                                <textarea
                                    class="col-xs-12 col-sm-9 col-md-9 answer"
                                    name="answer"
                                    v-model="form.answer"
                                    @input="$set(question, 'answer', $event.target.value)"
                                    data-autoresize
                                    placeholder="odpowiedź"></textarea>
                            </div>
                        </div>
                    </div>

                    <!--subNotes-->
                    <ul class="list-unstyled sub-note-list">
                        <li v-for="(subNote, index) in question.sub_notes">
                            <div class="row">
                                <div class="col-xs-11 col-xs-offset-1 col-sm-3 col-sm-offset-1 col-md-3 col-md-offset-1">
                                    <div class="bullet-point"></div>
                                    <div v-if="answered && reverse">
                                        <div class="name-field"
                                            :class="{'correct-answer': subNote.correctAnswer == subNote.answer,
                                                'incorrect-answer': subNote.correctAnswer != subNote.answer}">
                                            <strong>{{ subNote.answer }}</strong>
                                        </div>
                                        <div v-if="subNote.correctAnswer != subNote.answer">
                                            <div class="correct-answer">
                                                <strong>{{ subNote.correctAnswer }}</strong>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-else>
                                        <div v-if="reverse">
                                            <input type="text"
                                                name="answer"
                                                class="col-xs-12 col-sm-12 col-md-12 answer"
                                                @input="$set(form.sub_notes[index], 'answer', $event.target.value);
                                                        $set(form.sub_notes[index], 'id', subNote.id);
                                                        $set(question.sub_notes[index], 'answer', $event.target.value)"
                                                placeholder="odpowiedź">
                                        </div>
                                        <div v-else>
                                            <div class="name-field">
                                                <strong>{{ subNote.name }}</strong>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="dash">-</div>
                                </div>

                                <div v-if="answered && !reverse">
                                    <div class="col-xs-11 col-xs-offset-1 col-sm-8 col-sm-offset-0 col-md-8">
                                        <div :class="{'correct-answer': subNote.correctAnswer == subNote.answer,
                                                'incorrect-answer': subNote.correctAnswer != subNote.answer}">
                                            {{ subNote.answer }}
                                        </div>
                                        <div v-if="subNote.correctAnswer !== subNote.answer">
                                            <div class="correct-answer">
                                                {{ subNote.correctAnswer }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div v-else>
                                    <div v-if="reverse">
                                        <div class="col-xs-11 col-xs-offset-1 col-sm-offset-0 col-sm-8 col-md-8">
                                            {{ subNote.content }}
                                        </div>
                                    </div>
                                    <div v-else>
                                        <textarea
                                            class="col-xs-11 col-xs-offset-1 col-sm-offset-0 col-sm-8 col-md-8 answer"
                                            name="answer"
                                            @input="$set(form.sub_notes[index], 'answer', $event.target.value);
                                                    $set(form.sub_notes[index], 'id', subNote.id);
                                                    $set(question.sub_notes[index], 'answer', $event.target.value)"
                                            data-autoresize
                                            placeholder="odpowiedź"></textarea>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div class="pre-error">{{ errorMessage }}</div>
                    <div class="row">
                        <div class="buttons">
                            <button type="submit" class="btn" v-if="!answered">Wyślij</button>
                            <button type="button" @click="nextQuestion" class="btn">Następne</button>
                        </div>
                    </div>
                </form>
            </div>
            <div class="row notebook-info">
                <div class="col-md-12"><h5>Notatnik o nazwie {{ notebook.name }}</h5></div>
                <div class="col-md-12"><h6>użytkownika {{ notebookOwner }}</h6></div>
            </div>
            <div class="spacer"></div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Question',
        data() {
            return {
                question: {
                    correctAnswer: '',
                    sub_notes: [],
                },
                form: {
                    sub_notes: []
                },
                reverse: false,
                reverseNext: false,
                notebookOwner: null,
                answered: false,
                errorMessage: ''
            }
        },
        computed: {
            notebook() {
                return this.$store.state.notebook;
            }
        },
        methods: {
            getQuestion() {
                this.$http.get('notebooks/' + this.$route.params.id + '/question', {
                    params: {
                        reverse: this.reverse
                    }
                }).then(response => {
                    if (response.body.success) {
                        this.question = response.body.result;
                        this.form.id = this.notebook.id;

                        let that = this;
                        this.question.sub_notes.forEach(function() {
                            that.form.sub_notes.push({
                                id: '',
                                answer: ''
                            });
                        });
                    }
                }, response => {
                    alert('Wystąpił błąd.');
                });
            },
            getNotebook() {
                this.$http.get('notebooks/' + this.$route.params.id).then(response => {
                    if (response.body.success) {
                        this.$store.state.notebook = response.body.notebook[0];
                        this.notebookOwner = response.body.user;
                    }
                }, response => {
                    if (response.status === 403) {
                        this.forbidden = true;
                    } else if (response.status === 404) {
                        this.$router.push({ name: '404' });
                    }
                });
            },
            submitAnswer() {
                if (!$.trim($('.answer').val())) {
                    this.errorMessage = 'Podaj wszystkie odpowiedzi.'
                } else {
                    this.form.reverse = this.reverse;
                    this.$http.post('notes/' + this.question.id + '/answers', {
                        answer: this.form
                    }).then(response => {
                        if (response.body.success) {
                            let that = this;

                            this.question.correctAnswer = response.body.answer.answer;
                            this.question.sub_notes.forEach(function (subNote, key) {
                                response.body.answer.sub_notes.forEach(function (answer) {
                                    if (subNote.id === answer.id) {
                                        that.question.sub_notes[key].correctAnswer = answer.answer;
                                    }
                                });
                            });

                            this.answered = true;
                        } else {
                            alert('Wystąpił błąd');
                        }
                    }, response => {
                        alert('Wystąpił błąd');
                    });
                }
            },
            nextQuestion() {
                var notebooks = JSON.parse(localStorage.getItem('notebooks'));
                if (notebooks !== null && typeof notebooks !== 'undefined' && notebooks.length > 0) {
                    var id = notebooks[Math.floor(Math.random() * notebooks.length)];
                } else {
                    var id = this.$route.params.id;
                }
                localStorage.setItem('reverse', this.reverseNext);

                if (this.$route.params.id === id) {
                    this.load();
                } else {
                    this.$router.push({name: 'Question', params: {id: id}});
                    this.load();
                    this.$forceUpdate();
                }
            },
            load() {
                this.form = {
                    sub_notes: []
                };
                this.answered = false;
                this.reverse = (localStorage.getItem('reverse') === 'true');
                this.reverseNext = this.reverse;
                this.getNotebook();
                this.getQuestion();
            }
        },
        beforeMount() {
            this.load();
        },
        watch: {
            'question.sub_notes': function() {
                autosize($('textarea'));
            },
            'this.$route.params.id': function() {
                this.load();
            }
        }
    }
</script>
<style scoped>
    .instructions {
        min-height: 60px;
        color: #19252c;
        border-bottom: 1px solid #f68827;
        font-weight: bold;
    }
    .notebook-info {
        text-align: right;
        position: absolute;
        bottom: 22px;
        right: 22px;
    }
    .notebook-info h5 {
        color: #656565;
    }
    .notebook-info h6 {
        color: #7e7e7e;
    }
    .notebook-info h6, h5 {
        margin: 0;
    }
    textarea {
        outline: none;
        resize: none;
        overflow: hidden;
    }
    .sub-note-list li {
        margin-top: 10px;
        min-height: 47px;
    }
    .answers-container {
        margin-top: 10px;
    }
    .correct-answer {
        color: #4cae4c;
    }
    .incorrect-answer {
        color: #c91b25;
    }
    .buttons {
        float: right;
    }
    .buttons button {
        color: #2e4148;
        font-weight: bold;
        height: 30px;
        background: #f68827;
    }
    .spacer {
        height: 70px;
    }
    .reverse {
        float: right;
        margin-top: 10px;
    }
    form * {
        word-wrap: break-word;
    }
</style>
<style src="./../../css/notebook/qa/checkbox.css" scoped></style>
<style src="./../../css/notebook/list.css" scoped></style>