export interface LocaleDataType {
    navigation_notes: string;
    navigation_add_note: string;
    navigation_logout: string;
    navigation_login: string;
    navigation_register: string;
    tab_active: string;
    tab_archived: string;
    content_empty_note: string;
    dialog_email_placeholder: string;
    dialog_password_placeholder: string;
    dialog_name_placeholder: string;
    dialog_title_placeholder: string;
    dialog_body_placeholder: string;
    dialog_search_title: string;
    button_delete: string;
    button_archive: string;
    button_active: string;
    toast_add_success: string;
    toast_delete_success: string;
    toast_delete_error: string;
    toast_archive_success: string;
    toast_archive_error: string;
    toast_active_success: string;
    toast_active_error: string;
    alert_delete_title: string;
    alert_yes: string;
    alert_no: string;
      
}


export const localeData: {[key:string]: LocaleDataType} = {
    id: {
      navigation_notes: "Catatan",
      navigation_add_note: "Tambah Catatan",
      navigation_logout: "Keluar",
      navigation_login: "Masuk",
      navigation_register: "Daftar",
      tab_active: "Catatan Aktif",
      tab_archived: "Catatan Arsip",
      content_empty_note: "Catatan Kosong",
      dialog_email_placeholder: "Masukkan email anda...",
      dialog_password_placeholder: "Masukkan kata sandi anda...",
      dialog_name_placeholder: "Masukkan nama anda...",
      dialog_title_placeholder: "Masukkan judul catatan...",
      dialog_body_placeholder: "Masukkan isi catatan...",
      dialog_search_title: "Cari Judul Catatan",
      button_delete: "Hapus",
      button_archive: "Arsip",
      button_active: "Aktif",
      toast_add_success: "Catatan Berhasil Ditambahkan",
      toast_delete_success: "Catatan berhasil dihapus",
      toast_delete_error: "Catatan gagal dihapus",
      toast_archive_success: "Catatan berhasil diarsip",
      toast_archive_error: "Catatan gagal diarsip",
      toast_active_success: "Catatan berhasil diaktifkan",
      toast_active_error: "Catatan gagal diaktifkan",
      alert_delete_title: "Apakah kamu yakin untuk menghapus catatan ini?",
      alert_yes: "Ya",
      alert_no: "Tidak",
    },
    en: {
      navigation_notes: "Notes",
      navigation_add_note: "Add Note",
      navigation_logout: "Logout",
      navigation_login: "Login",
      navigation_register: "Register",
      tab_active: "Notes Active",
      tab_archived: "Notes Archived",
      content_empty_note: "Empty Note",
      dialog_email_placeholder: "Enter your email...",
      dialog_password_placeholder: "Enter your password...",
      dialog_name_placeholder: "Enter your name...",
      dialog_title_placeholder: "Enter note title...",
      dialog_body_placeholder: "Enter note content...",
      dialog_search_title: "Search Note Title",
      button_delete: "Delete",
      button_archive: "Archive",
      button_active: "Active",
      toast_add_success: "Add Note Success",
      toast_delete_success: "Delete note success",
      toast_delete_error: "Delete note failed",
      toast_archive_success: "Archive note success",
      toast_archive_error: "Archive note failed",
      toast_active_success: "Activation note success",
      toast_active_error: "Activation note failed",
      alert_delete_title: "Are you sure for delete this note?",
      alert_yes: "Yes",
      alert_no: "No",
    },
  };