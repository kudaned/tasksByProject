<template>
    <div>
        <!-- <v-checkbox v-model="status" class="pa-0 ma-0" :label="label" @input="(status) => callback($event, 'Check1', status)"></v-checkbox> -->
            <!-- v-model="status"  -->
        <v-checkbox 
            v-model="status" 
            class="pa-0 ma-0" 
            :label="label" 
            @input="callback(name, status, labelStatus)">
        </v-checkbox>
            <!-- @input="handleClick(name, status)"> -->
            <!-- @input="(status) => handleClick(name, status)"> -->
    </div>
</template>

<script>
export default {
    props: {
        incomingValue: Boolean,
        displayLabel: String,
        dbLabel: String,
        incomingName: String,
        callback: Function
    },
    data() {
        return {
            status: this.incomingValue,
            label: this.displayLabel,
            labelStatus: this.dbLabel,
            name: this.incomingName
        }
    },
    watch: {
        status(value){
            this.callback(this.incomingName, value, this.labelStatus)
        }
    }
}
</script>