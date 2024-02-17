export const SampleAsyncComponent = () => ({
  text: '',
  init() {
    console.log('[async] init');
    this.text = 'Sample async component loaded';
  }
});

export default SampleAsyncComponent;
