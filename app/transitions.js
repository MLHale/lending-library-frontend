export default function(){
    this.transition(
      this.fromRoute('library.index'),
      this.toRoute('library.library-items'),
      this.use('toLeft'),
      this.reverse('toRight')
    );
}
