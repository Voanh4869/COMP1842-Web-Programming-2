<template>
  <form action="#" @submit.prevent="onSubmit">
     <p v-if="errorsPresent" class="error">Please fill out both fields!</p>

     <div class="ui labeled input fluid">
       <div class="ui label">
         <i class="germany flag"></i> German
       </div>
       <input type="text" placeholder="Enter German word..." v-model="formWord.german" />
     </div>

     <div class="ui labeled input fluid">
       <div class="ui label">
         <i class="united kingdom flag"></i> English
       </div>
       <input type="text" placeholder="Enter English word..." v-model="formWord.english" />
     </div>

     <div class="ui labeled input fluid">
       <div class="ui label">
        <i class="vietnam flag"></i> Vietnamese</div>
       <input type="text" placeholder="Enter Vietnamese word..." v-model="formWord.vietnamese" />
     </div>

     <button class="positive ui button">Submit</button>
   </form>
 </template>
 
 <script>
 export default {
   name: 'word-form',
   props: {
     word: {
       type: Object,
       required: false
     }
   },
   data() {
     return {
      errorsPresent: false,
      _local: { english: '', german: '', vietnamese: '' }
     };
   },
  computed: {
    formWord: {
      get() {
        // if parent passed a word object, edit it directly (keeps existing behavior)
        if (this.word) return this.word;
        // otherwise use a local object
        if (!this._local) this._local = { english: '', german: '', vietnamese: '' };
        return this._local;
      },
      set(v) {
        if (this.word) {
          // copy properties into parent object
          this.word.english = v.english;
          this.word.german = v.german;
          this.word.vietnamese = v.vietnamese;
        } else {
          this._local = v;
        }
      }
    }
  },
   methods: {
     onSubmit: function() {
      const w = this.formWord;
      if (!w.english || !w.german || !w.vietnamese) {
        this.errorsPresent = true;
        return;
      }
      this.errorsPresent = false;
      // emit event for parent to create or update (include vietnamese)
      this.$emit('createOrUpdate', { ...w });
     }
   }
 };
 </script>
 
 <style scoped>
 .error {
   color: red;
 }
 </style>