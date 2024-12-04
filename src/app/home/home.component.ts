import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  // Import CommonModule
import { FormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';
import { Editor } from 'tinymce';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,FormsModule,EditorModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  editorContent = 'Hello World!'; 

  constructor() { }

  tinymceConfig = {
    height: 400,
    menubar: true,
    plugins: [
      'advlist autolink lists link image charmap print preview anchor',
      'searchreplace visualblocks code fullscreen',
      'insertdatetime media table paste code help wordcount'
    ],
    toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | bullist numlist | link image',
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
    setup: (editor: Editor) => {
      editor.on('init', () => {
        // Show a notification message when the editor is initialized
        editor.notificationManager.open({
          text: 'Welcome to TinyMCE!',
          type: 'info',  // Use 'info', 'warning', or 'error'
          timeout: 5000  // Automatically close the message after 5 seconds
        });
      });
      // Optional: You can also show notifications based on user actions
      editor.ui.registry.addButton('showMessageButton', {
        text: 'Show Message',
        onAction: () => {
          editor.notificationManager.open({
            text: 'This is a custom notification!',
            type: 'info',
            timeout: 3000
          });
        }
      });
    }
  };
}
