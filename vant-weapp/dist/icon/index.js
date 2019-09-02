import { VantComponent } from '../common/component';
VantComponent({
    props: {
        info: null,
        name: String,
        isZGTIcon: Boolean,
        size: String,
        color: String,
        customStyle: String,
        classPrefix: {
            type: String,
            value: 'van-icon'
        }
    },
    methods: {
        onClick() {
            this.$emit('click');
        }
    }
});
