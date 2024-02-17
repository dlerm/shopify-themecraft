export const SampleSyncComponent = () => ({
  text: '',
  init() {
    console.log('[sync] init');
    this.text = 'Sample sync component loaded';
  }
});

export default SampleSyncComponent;
