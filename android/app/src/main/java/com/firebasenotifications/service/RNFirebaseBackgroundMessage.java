package com.firebasenotifications.service;
import android.content.Intent;
import android.os.Bundle;
import com.facebook.react.HeadlessJsTaskService;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.jstasks.HeadlessJsTaskConfig;
import javax.annotation.Nullable;

public class RNFirebaseBackgroundMessage extends HeadlessJsTaskService {

  @Override
  protected @Nullable HeadlessJsTaskConfig getTaskConfig(Intent intent) {
    Bundle extras = intent.getExtras();
    if (extras != null) {
      return new HeadlessJsTaskConfig(
          "RNFirebaseBackgroundMessage",
          //Arguments.fromBundle(extras),
          extras != null ? Arguments.fromBundle(extras) : null,
          5000, // timeout for the task
          //false // optional: defines whether or not  the task is allowed in foreground. Default is false
          true
        );
    }
    return null;
  }
}